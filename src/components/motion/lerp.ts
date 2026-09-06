"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/* Continuous smoothing. Never a fixed per-frame factor: that looks right at
   60fps and runs twice as fast at 120Hz. *//* Smoothing kontinu — hasil riset lusion.co, 2026-09-02 */

export const LUSION_DECAY = {
  scroll: 5.4,
  pointer: 4.0,
} as const;

export function decayFactor(k: number, dt: number): number {
  return 1 - Math.exp(-k * dt);
}

export function halfLife(k: number): number {
  return Math.LN2 / k;
}

export function decayFromHalfLife(seconds: number): number {
  return Math.LN2 / seconds;
}

export function naiveFactorPerFrame(k: number): number {
  return decayFactor(k, 1 / 60);
}

export function useRaf(callback: (dt: number, elapsed: number) => void, enabled = true) {
  const cb = useRef(callback);

  useEffect(() => {
    cb.current = callback;
  });

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;
    let last = performance.now();
    const start = last;

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 1 / 15);
      last = now;
      cb.current(dt, (now - start) / 1000);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [enabled]);
}

export function useOnScreen(ref: RefObject<Element | null>, margin = "300px"): boolean {
  const [onScreen, setOnScreen] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, margin]);

  return onScreen;
}

/** Whether the visitor asked for reduced motion. */
export function useMotionOff(): boolean {
  const [off, setOff] = useState(false);

  useEffect(() => {
    const read = () => setOff(document.documentElement.classList.contains("motion-off"));
    read();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);

  return off;
}

export const MAX_VELOCITY = 200;

export function useScrollSpeed({
  baseSpeed,
  boost,
  direction = -1,
  loopLength,
  enabled,
  onFrame,
}: {
  baseSpeed: number;
  boost: number;
  direction?: -1 | 1;
  loopLength?: () => number;
  enabled: boolean;
  onFrame: (pos: number) => void;
}) {
  const pos = useRef(0);
  const scrollHalus = useRef(0);

  const perluSinkron = useRef(true);

  useEffect(() => {
    if (!enabled) perluSinkron.current = true;
  }, [enabled]);

  const cbFrame = useRef(onFrame);
  useEffect(() => {
    cbFrame.current = onFrame;
  });

  useRaf((dt) => {
    const target = window.scrollY;

    if (perluSinkron.current) {
      perluSinkron.current = false;
      scrollHalus.current = target;
      return;
    }

    scrollHalus.current +=
      (target - scrollHalus.current) * decayFactor(LUSION_DECAY.scroll, dt);
    const vel = Math.max(
      -MAX_VELOCITY,
      Math.min(MAX_VELOCITY, target - scrollHalus.current),
    );

    pos.current += (baseSpeed * direction + vel * boost) * dt;

    const p = loopLength?.() ?? 0;
    if (p > 0) pos.current = ((pos.current % p) + p) % p;

    cbFrame.current(pos.current);
  }, enabled);
}
