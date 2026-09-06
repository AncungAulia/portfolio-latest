"use client";

import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { ClipRise } from "@/components/motion/ClipRise";
import { EASE } from "@/components/motion/easing";
import { getLenis, navbarOffset } from "@/components/motion/lenis";
import { useMotionOff } from "@/components/motion/lerp";
import { PROJECTS } from "@/data/projects";
import { freezeView, unfreezeView } from "./transition-store";

const TITLES: Record<string, string> = {
  "/": "Home",
  "/#top": "Home",
  "/#tentang": "About",
  "/#projects": "Projects",
  "/#experience": "Experience",
  "/projects": "Projects",
  "/about": "About",
  "/experience": "Experience",
  "/cv": "CV",
};

/* Project pages are looked up in the data rather than listed above: the names
   already live there, and a card link's textContent is the whole card. */
function resolveTitle(pathname: string, hash: string, fallback?: string) {
  const fixed = TITLES[pathname + hash];
  if (fixed) return fixed;

  const match = /^\/projects\/([^/]+)\/?$/.exec(pathname);
  if (match) {
    const project = PROJECTS.find((p) => p.slug === match[1]);
    if (project) return project.title;
  }

  return fallback ?? "";
}

/** Seconds. `hold` is measured from the click, so it also floors the whole
 *  transition. Click and back/forward now share every number. */
const TIMING = { close: 0.55, hold: 1.05, open: 0.55 };

/** The title starts rising 55% of the way through the panel drop. Same overlap
 *  as the intro; sequenced strictly, the transition breaks into two moves. */
const TITLE_DELAY = TIMING.close * 0.55;

/** If a navigation hangs, the panel must not cover the page forever. */
const FAILSAFE_MS = 4000;

/** Scroll position per route, so Back returns where you were. Module level: it
 *  has to survive the remounts navigation causes. */
const scrollMemory = new Map<string, number>();

/* Panel drops from the top, the title rises, then it exits upward like the
   intro.

   Two paths in, and they differ in what can be held back:

     click        `router.push` is delayed until the panel is fully closed, so
                  rendering the next page never competes with the animation.
     back/forward `popstate` cannot be intercepted — the URL is already gone and
                  Next starts rendering immediately (measured at 28ms). So the
                  VIEW is frozen instead (see FrozenView) and released once the
                  panel covers the screen.

   Because the view is frozen, both paths can now use identical timing. */
export function PageTransition() {
  const [phase, setPhase] = useState<"idle" | "closing" | "restoring" | "opening">("idle");
  const [title, setTitle] = useState("");
  const target = useRef<string | null>(null);
  const hash = useRef<string | null>(null);
  const startedAt = useRef(0);
  const pathname = usePathname();
  const router = useRouter();
  const motionOff = useMotionOff();

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = (e.target as Element | null)?.closest?.("a");
      const href = link?.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      if (link?.getAttribute("target") || link?.hasAttribute("download")) return;

      const url = new URL(href, window.location.href);
      if (url.pathname === window.location.pathname) return;

      e.preventDefault();

      // Reduced motion still has to arrive; only the panel is dropped.
      if (motionOff) {
        router.push(href);
        return;
      }

      // The hash is kept out of the pushed URL: we scroll there ourselves, so
      // it has no job in the address bar.
      target.current = url.pathname + url.search;
      hash.current = url.hash || null;
      scrollMemory.set(window.location.pathname, window.scrollY);
      setTitle(resolveTitle(url.pathname, url.hash, link?.textContent?.trim()));
      startedAt.current = performance.now();
      setPhase("closing");
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [motionOff, router]);

  useEffect(() => {
    if (motionOff) return;

    const onPopState = () => {
      if (target.current) return;

      // Freeze FIRST. Next has already begun rendering the next page, and this
      // is the only thing standing between the visitor and that page.
      freezeView();
      setTitle(resolveTitle(window.location.pathname, window.location.hash));
      startedAt.current = performance.now();
      setPhase((p) => (p === "idle" ? "restoring" : p));
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [motionOff]);

  /* Runs while the panel still covers the screen, so the jump is never seen.

     Three cases:
       hash         land on that section
       back/forward return to where the visitor was
       plain click  start at the top

     The last one used to be missing, which is why opening a project from the
     bottom of /projects landed on the footer. */
  const restoreScroll = useCallback((restoring: boolean) => {
    const h = hash.current;
    hash.current = null;

    const lenis = getLenis();
    const go = (y: number) => {
      if (lenis) lenis.scrollTo(y, { immediate: true });
      else window.scrollTo(0, y);
    };

    if (h) {
      const el = document.querySelector(h);
      if (el) go(window.scrollY + el.getBoundingClientRect().top - navbarOffset());
      return;
    }

    go(restoring ? (scrollMemory.get(window.location.pathname) ?? 0) : 0);
  }, []);

  const scheduleOpen = useCallback(
    (restoring: boolean) => {
      const left = Math.max(0, TIMING.hold * 1000 - (performance.now() - startedAt.current));
      window.setTimeout(() => {
        restoreScroll(restoring);
        setPhase("opening");
      }, left);
    },
    [restoreScroll],
  );

  // Click path: the next page is mounted once `pathname` changes. Restoring is
  // driven from onAnimationComplete instead, because there the pathname changed
  // before the panel even started moving.
  useEffect(() => {
    if (phase !== "closing" || target.current) return;

    const left = Math.max(0, TIMING.hold * 1000 - (performance.now() - startedAt.current));
    const timer = window.setTimeout(() => {
      restoreScroll(false);
      setPhase("opening");
    }, left);
    return () => window.clearTimeout(timer);
  }, [pathname, phase, restoreScroll]);

  useEffect(() => {
    if (phase !== "closing" && phase !== "restoring") return;

    const timer = window.setTimeout(() => {
      target.current = null;
      unfreezeView();
      setPhase("opening");
    }, FAILSAFE_MS);
    return () => window.clearTimeout(timer);
  }, [phase]);

  /* Reads `phase` straight from the closure instead of through a setState
     updater. That is not a style choice: React runs updaters DURING render, so
     calling unfreezeView() inside one updates FrozenView mid-render and React
     rightly complains. Keeping the side effects out here — the callback only
     ever runs from onAnimationComplete, well after render — makes it legal. */
  const onAnimationDone = useCallback(() => {
    // Panel just finished closing on a click: leave now.
    if (target.current) {
      const next = target.current;
      target.current = null;
      router.push(next);
      return;
    }

    // Panel just covered the screen on back/forward: swap the page behind it.
    if (phase === "restoring") {
      unfreezeView();
      scheduleOpen(true);
      return;
    }

    if (phase === "opening") setPhase("idle");
  }, [phase, router, scheduleOpen]);

  if (phase === "idle") return null;

  const closing = phase === "closing" || phase === "restoring";

  return (
    <motion.div
      aria-hidden
      className="transition-panel fixed inset-x-0 top-0 z-[110] flex h-[100dvh] items-center justify-center bg-dark px-6 text-light"
      initial={{ y: "-101%" }}
      animate={{ y: closing ? "0%" : "-101%" }}
      transition={{ duration: closing ? TIMING.close : TIMING.open, ease: EASE.panel }}
      onAnimationComplete={onAnimationDone}
    >
      {/* `key` forces a remount so ClipRise replays: it is pure CSS and has no
          way to be restarted from the outside. */}
      <ClipRise
        key={title}
        lines={[title]}
        delay={TITLE_DELAY}
        className="text-[2.4rem] leading-[1.02] tracking-[-0.03em] md:text-[4.5rem]"
      />

      {/* Curved bottom edge. A slice of ellipse that swells mid-travel, not an
          animated border-radius, whose interpolation is unreliable. */}
      <motion.div
        className="absolute inset-x-0 top-full h-[14vh] origin-top bg-dark"
        style={{ borderRadius: "0 0 50% 50% / 0 0 100% 100%" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: [0, 1, 0] }}
        transition={{
          duration: closing ? TIMING.close : TIMING.open,
          times: [0, 0.45, 1],
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
