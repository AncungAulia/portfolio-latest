/* Tiny store shared by PageTransition (which decides) and FrozenView (which
   obeys). Module level, not context: the two live as siblings in the layout,
   and the value is only read through useSyncExternalStore. */

let frozen = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((fn) => fn());
}

/** Hold the current page view. Called before the route changes. */
export function freezeView() {
  if (frozen) return;
  frozen = true;
  emit();
}

/** Release it, so the new page renders. Called while the panel still covers it. */
export function unfreezeView() {
  if (!frozen) return;
  frozen = false;
  emit();
}

export function isViewFrozen() {
  return frozen;
}

export function subscribeView(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
