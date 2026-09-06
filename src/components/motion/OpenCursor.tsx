"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

import { ClipRise } from "@/components/motion/ClipRise";
import { LUSION_DECAY, decayFactor, useMotionOff, useRaf } from "@/components/motion/lerp";

const FADE_MS = 320;

export type KursorBukaProps = {
  area: RefObject<HTMLElement | null>;
  label: string;
};

/* Two elements on purpose: the pivot carries POSITION (written by rAF), the
   disc carries SIZE and shrinks into its own centre. Merged into one, `scale`
   applies after `transform` and the disc flies to the viewport corner. */
export function OpenCursor({ area, label }: KursorBukaProps) {
  const pivot = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const fadeTimer = useRef<number | null>(null);
  const [visible, setTerlihat] = useState(false);
  const [alive, setHidup] = useState(false);
  const [finePointer, setHalus] = useState(false);
  const motionOff = useMotionOff();

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const read = () => setHalus(mq.matches);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);

  useEffect(() => {
    const el = area.current;
    if (!el || !finePointer) return;

    let showing = false;

    // Drives [data-cursor-hidden] in globals.css. Toggled here, not left to a
    // static class, so the arrow comes back the moment the disc does.
    const nativeCursor = (hidden: boolean) => {
      el.toggleAttribute("data-cursor-hidden", hidden);
    };

    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = (e: PointerEvent) => {
      if (fadeTimer.current !== null) {
        window.clearTimeout(fadeTimer.current);
        fadeTimer.current = null;
      }
      target.current = { x: e.clientX, y: e.clientY };
      current.current = { x: e.clientX, y: e.clientY };
      if (pivot.current) {
        pivot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      showing = true;
      nativeCursor(true);
      setHidup(true);
      setTerlihat(true);
    };

    const onLeave = () => {
      if (!showing) return;
      showing = false;
      nativeCursor(false);
      setTerlihat(false);
      if (fadeTimer.current !== null) window.clearTimeout(fadeTimer.current);
      fadeTimer.current = window.setTimeout(() => setHidup(false), FADE_MS);
    };

    /* Scrolling the list out from under a still mouse fires no pointerleave:
       the pointer never moved, so the browser keeps the old hover target and
       the disc was left floating over the next section. The pointer position is
       still valid during a scroll, so re-test it against the list instead.

       One direction only. Scrolling back cannot re-show it, because while the
       cursor is outside the list no event reports where the mouse went, and
       re-entering on a stale position would put the disc somewhere the pointer
       is not. A real pointerenter handles that case anyway. */
    const onScroll = () => {
      if (!showing) return;
      const r = el.getBoundingClientRect();
      const { x, y } = target.current;
      if (x < r.left || x > r.right || y < r.top || y > r.bottom) onLeave();
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("scroll", onScroll);
      el.removeAttribute("data-cursor-hidden");
      if (fadeTimer.current !== null) window.clearTimeout(fadeTimer.current);
    };
  }, [area, finePointer]);

  useRaf(
    (dt) => {
      const el = pivot.current;
      if (!el) return;

      const f = motionOff ? 1 : decayFactor(LUSION_DECAY.pointer, dt);
      current.current.x += (target.current.x - current.current.x) * f;
      current.current.y += (target.current.y - current.current.y) * f;

      el.style.transform = `translate3d(${current.current.x.toFixed(2)}px, ${current.current.y.toFixed(2)}px, 0)`;
    },
    finePointer && alive,
  );

  if (!finePointer) return null;

  return (
    <div ref={pivot} aria-hidden className="cursor-pivot">
      <div className={`cursor-disc ${visible ? "scale-100" : "scale-0"}`}>
        <ClipRise key={label} lines={[label]} />
      </div>
    </div>
  );
}
