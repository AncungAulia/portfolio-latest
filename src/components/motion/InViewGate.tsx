"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type InViewGateProps = {
  children: ReactNode;
  className?: string;
  /** How much must be visible before releasing, 0-1. */
  amount?: number;
};

/* Holds ClipRise until the content is actually scrolled into view. Without it,
   sections below the fold play out while the visitor is still on the hero.

   Starts `false` so server and first client render match. With JS disabled it
   never turns true, and that is fine: the delay rule in globals.css is scoped
   to `html.intro-js`, so the text simply shows. */
export function InViewGate({ children, className, amount = 0.2 }: InViewGateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver: release rather than hold the text forever.
    // Deferred a frame because setState in an effect body cascades renders.
    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setSeen(true));
      return () => cancelAnimationFrame(id);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // Once only; text that re-animates on every pass is distracting.
        setSeen(true);
        io.disconnect();
      },
      { threshold: amount },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [amount]);

  return (
    <div ref={ref} data-rise="inview" data-seen={seen ? "" : undefined} className={className}>
      {children}
    </div>
  );
}
