/* Fills an image slot for a project that has no screenshot yet.

   A bare grey panel reads as something that failed to load. The hazard stripes
   and the pulsing dot read as something deliberately still being built, which
   is the truth. Stripes come from a repeating gradient, so there is no asset to
   load and nothing to keep in sync. */
export function WorkInProgress() {
  return (
    <div className="relative grid size-full place-items-center overflow-hidden bg-neutral-550">
      <div aria-hidden className="wip-stripes absolute inset-0" />

      <div className="relative flex items-center gap-2.5">
        {/* `motion-safe` only: a dot that never stops blinking is exactly the
            kind of thing reduced-motion exists to silence. */}
        <span className="size-1.5 rounded-full bg-ember motion-safe:animate-pulse" />
        <span className="text-[11px] tracking-[0.14em] text-light/60 uppercase md:text-[12px]">
          Work in progress
        </span>
      </div>
    </div>
  );
}
