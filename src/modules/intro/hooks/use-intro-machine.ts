"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { INTRO_STORAGE_KEY, INTRO_TIMELINE, SHOW_ON_EVERY_LOAD } from "../intro.config";
import { assetsReady } from "../lib/assets-ready";

export type IntroPhase = "loading" | "holding" | "exiting" | "done";

const neverChanges = () => () => {};

/* Progress chases a moving ceiling instead of stepping through fixed stops.

   While the assets are still loading the ceiling is 90, so the bar decelerates
   and stalls there — the shape real loading has. The moment they resolve the
   ceiling becomes 100 and the last stretch closes quickly.

   The consequence is that 100% means something: it is only ever reached after
   the fonts and images are actually in. */
export function useIntroMachine() {
  const skip = useSyncExternalStore(
    neverChanges,
    () => document.documentElement.classList.contains("intro-skip"),
    () => false,
  );

  const [phase, setPhase] = useState<IntroPhase>("loading");
  const [progress, setProgress] = useState(0);
  const value = useRef(0);

  const currentPhase: IntroPhase = skip ? "done" : phase;

  useEffect(() => {
    if (skip) return;

    let raf = 0;
    let cancelled = false;
    let ready = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let startedAt = 0;
    let lastAt = 0;
    let finishFrom = 0;
    let finishAt = 0;

    void assetsReady().then(() => {
      ready = true;
    });

    const pause = (seconds: number) =>
      new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, seconds * 1000));
      });

    const finish = async () => {
      setPhase("holding");
      await pause(INTRO_TIMELINE.hold);
      if (cancelled) return;

      setPhase("exiting");
      await pause(INTRO_TIMELINE.exit);
      if (cancelled) return;

      setPhase("done");
    };

    const tick = (now: number) => {
      if (!startedAt) {
        startedAt = now;
        lastAt = now;
      }

      const elapsed = (now - startedAt) / 1000;
      const dt = (now - lastAt) / 1000;
      lastAt = now;

      const done = ready && elapsed >= INTRO_TIMELINE.minDuration;

      /* The TARGET is derived from elapsed time, not integrated per frame.
         Integrating `dt` ties the bar to the frame rate, and the frame rate is
         exactly what collapses while a page is loading. */
      let goal: number;

      if (done) {
        if (!finishAt) {
          finishAt = now;
          finishFrom = value.current;
        }
        // Flat rate to the end, so the bar visibly closes instead of crawling.
        goal = Math.min(100, finishFrom + INTRO_TIMELINE.finishRate * ((now - finishAt) / 1000));
      } else {
        goal = INTRO_TIMELINE.ceiling * (1 - Math.exp(-INTRO_TIMELINE.speed * elapsed));
      }

      /* Reading the clock alone is not enough: a blocked main thread stops the
         frames but not the clock, so the bar teleports on the frame that lands.
         Measured before this cap: hydration stalled one frame for 250ms and the
         number went 0 -> 80 in a single paint. Limiting the RATE keeps the
         target honest while making any catch-up something you can watch. */
      value.current = Math.min(goal, value.current + INTRO_TIMELINE.maxRate * dt);

      if (value.current >= 100) {
        setProgress(100);
        void finish();
        return;
      }

      setProgress(value.current);
      raf = requestAnimationFrame(tick);
    };

    /* Two frames before the clock starts. The first rAF fires BEFORE the panel's
       initial paint, so anchoring there spends the opening of the timeline on a
       screen nobody has seen yet — measured at ~1.1s of the curve already gone
       by the time the wordmark first appeared. */
    raf = requestAnimationFrame(() => {
      raf = requestAnimationFrame(tick);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, [skip]);

  // Scroll stays locked until the panel is gone.
  useEffect(() => {
    if (currentPhase === "done") return;

    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";

    return () => {
      root.style.overflow = previous;
    };
  }, [currentPhase]);

  useEffect(() => {
    if (SHOW_ON_EVERY_LOAD) return;
    if (currentPhase !== "done") return;
    try {
      sessionStorage.setItem(INTRO_STORAGE_KEY, "1");
    } catch {
      // Private mode blocks storage; showing the intro again is harmless.
    }
  }, [currentPhase]);

  return { phase: currentPhase, progress, introRan: !skip };
}
