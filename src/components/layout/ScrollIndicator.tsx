"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { useMotionOff } from "@/components/motion/lerp";

/* Custom scroll indicator. The native scrollbar is hidden in globals.css.
   Thumb length is proportional, so it also shows how long the page is. *//* Indikator onScroll buatan sendiri */

const SILENT = 900;

const THUMB_MIN = 20;

export function ScrollIndicator() {
  const track = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLDivElement>(null);
  const timer = useRef<number | null>(null);
  const [visible, setTerlihat] = useState(false);
  const [scrollable, setBisaGulir] = useState(false);
  const motionOff = useMotionOff();

  const measure = useCallback(() => {
    const doc = document.documentElement;
    const range = doc.scrollHeight - window.innerHeight;

    if (range <= 4) {
      setBisaGulir(false);
      return;
    }
    setBisaGulir(true);

    const t = track.current;
    const th = thumb.current;
    if (!t || !th) return;

    const trackHeight = t.clientHeight;
    const thumbHeight = Math.max(THUMB_MIN, trackHeight * (window.innerHeight / doc.scrollHeight));
    const progress = Math.min(1, Math.max(0, window.scrollY / range));

    th.style.height = `${thumbHeight}px`;
    th.style.transform = `translateY(${(progress * (trackHeight - thumbHeight)).toFixed(2)}px)`;
  }, []);

  useEffect(() => {
    const first = requestAnimationFrame(measure);

    const onScroll = () => {
      measure();
      setTerlihat(true);
      if (timer.current !== null) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setTerlihat(false), SILENT);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    const observer = new ResizeObserver(measure);
    observer.observe(document.documentElement);

    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      observer.disconnect();
      if (timer.current !== null) window.clearTimeout(timer.current);
    };
  }, [measure]);

  useEffect(() => {
    if (!scrollable) return;
    const timer = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(timer);
  }, [scrollable, measure]);

  if (!scrollable) return null;

  return (
    <div
      ref={track}
      aria-hidden
      className={`pointer-events-none fixed top-1/2 right-2 z-30 h-[26vh] max-h-[240px] min-h-[140px] w-[5px] -translate-y-1/2 rounded-full bg-dark/10 transition-opacity duration-300 md:right-3 ${
        motionOff || visible ? "opacity-100" : "opacity-0"
      } ${motionOff ? "transition-none" : ""}`}
    >
      <div ref={thumb} className="w-full rounded-full bg-dark/70" />
    </div>
  );
}
