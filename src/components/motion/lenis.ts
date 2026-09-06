import type Lenis from "lenis";

/* Module-level, not context: the instance is needed by siblings in the layout,
   and it is never read during render. Scrolling MUST go through Lenis — it
   rewrites window scroll every frame and would undo a direct scrollTo. */
let alive: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  alive = l;
}

export function getLenis(): Lenis | null {
  return alive;
}

const BREATHING_ROOM = 20;

export function navbarOffset() {
  const bar = document.querySelector(".navbar-bar");
  return (bar ? bar.getBoundingClientRect().height : 60) + BREATHING_ROOM;
}
