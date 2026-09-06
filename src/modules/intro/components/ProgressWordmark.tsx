"use client";

import { INTRO_WORD } from "../intro.config";

/* The wordmark IS the progress bar: one dim copy underneath, one bright copy on
   top revealed left to right by a clipping box.

   Two solid copies rather than a clipped gradient: a gradient edge softens
   across a character and reads as a glow, while a hard clip fills glyph by
   glyph, which is what makes it legible as progress.

   `w-max` on the inner copy is what makes it work at all — the clip box shrinks
   to the percentage, and without it the text inside would rewrap to that width
   instead of being cut.

   `leading-[1.3]`, not `1`: with a tight line box the tail of the "g" hangs
   below it, and the clipping box (which is `inset-y-0`) cut it off — so the
   descender stayed dim while the rest of the letter filled. */
export function ProgressWordmark({ progress }: { progress: number }) {
  const shown = Math.round(progress);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        role="progressbar"
        aria-valuenow={shown}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Loading"
        className="relative w-max text-[clamp(1.75rem,7vw,4.5rem)] leading-[1.3] font-normal tracking-[-0.04em] whitespace-nowrap select-none"
      >
        <span className="block text-light/15">{INTRO_WORD}</span>

        <span
          aria-hidden
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          <span className="block w-max text-light">{INTRO_WORD}</span>
        </span>
      </div>

      {/* Tabular figures come from <body>, so the number never shifts width as
          it counts up. */}
      <span aria-hidden className="text-[12px] tracking-[0.14em] text-light/40 md:text-[13px]">
        {shown}%
      </span>
    </div>
  );
}
