"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";
import "lenis/dist/lenis.css";

import { getLenis, navbarOffset, setLenis } from "./lenis";
import { LUSION_DECAY, naiveFactorPerFrame, useMotionOff, useRaf } from "./lerp";

/* Gulir finePointer, dikendalikan Lenis */

/* Lenis anchors are OFF: they still write `#section` into the address bar.
   Hash links are handled here so the URL stays clean. */
export function SmoothScroll() {
  const motionOff = useMotionOff();
  const lenis = useRef<Lenis | null>(null);

  useEffect(() => {
    if (motionOff) return;

    const instance = new Lenis({
      lerp: naiveFactorPerFrame(LUSION_DECAY.scroll),
      autoRaf: false,
      anchors: false,
    });

    lenis.current = instance;
    setLenis(instance);
    return () => {
      instance.destroy();
      lenis.current = null;
      setLenis(null);
    };
  }, [motionOff]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = (e.target as Element | null)?.closest?.("a");
      const href = link?.getAttribute("href");
      if (!href) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }

      if (!url.hash || url.hash === "#") return;
      if (url.pathname !== window.location.pathname) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      e.preventDefault();

      const lenisKini = getLenis();
      if (lenisKini) {
        lenisKini.scrollTo(target as HTMLElement, { offset: -navbarOffset() });
        return;
      }

      const y = window.scrollY + target.getBoundingClientRect().top - navbarOffset();
      window.scrollTo({ top: y, behavior: "auto" });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useRaf(() => {
    lenis.current?.raf(performance.now());
  }, !motionOff);

  return null;
}
