"use client";

import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext, useEffect, useRef, useState, type ReactNode } from "react";

import { isViewFrozen, subscribeView } from "./transition-store";

/* Holds the previous page on screen while the transition panel is closing.

   Browser back/forward cannot be intercepted: by the time `popstate` fires the
   URL is already gone and Next has begun rendering the next page — measured at
   28ms, while the panel needs ~390ms to cover the screen. That gap is the flash
   of the new page appearing before the panel hides it.

   ## Why holding the element is not enough

   The first attempt captured `children` and kept rendering it. It did nothing:
   in the App Router `children` is a slot that reads LayoutRouterContext, so the
   captured element still re-renders into the new route. Measured: the heading
   was already the new page's at 28ms.

   What actually has to be frozen is the CONTEXT. While frozen we hand the
   subtree the context value captured before the route changed, so it keeps
   painting the page the visitor was looking at.

   ## The cost, stated plainly

   `LayoutRouterContext` is a Next internal (`next/dist/shared/lib/...`), not
   public API. It has been stable across App Router versions and this is the
   standard approach for page transitions, but a major upgrade could move it.
   If transitions ever break after upgrading Next, look here first. */
export function FrozenView({ children }: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const latest = useRef(context);
  const [held, setHeld] = useState<typeof context | null>(null);

  // After every commit, so it always holds the context currently on screen.
  useEffect(() => {
    latest.current = context;
  });

  useEffect(
    () =>
      subscribeView(() => {
        setHeld(isViewFrozen() ? latest.current : null);
      }),
    [],
  );

  return (
    <LayoutRouterContext.Provider value={held ?? context}>
      {children}
    </LayoutRouterContext.Provider>
  );
}
