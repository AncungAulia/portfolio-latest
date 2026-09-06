/** How often the preloader shows: every load, or once per browser session. */
export const SHOW_ON_EVERY_LOAD = true;

export const INTRO_STORAGE_KEY = "intro:seen";

/** The wordmark that fills up. Same spelling as the navbar brand. */
export const INTRO_WORD = "ancungaulia";

export const INTRO_TIMELINE = {
  /** How fast progress chases its target. Continuous decay, not a per-frame
   *  step, so it feels identical at 60Hz and 120Hz. */
  speed: 1.25,

  /** Ceiling on how fast the number may MOVE, percent per second, whatever the
   *  clock says. Without it a stalled frame teleports the bar; with it the
   *  opening reads as a brisk ramp that eases into the stall. */
  maxRate: 60,

  /** Progress stalls here until the assets are genuinely ready.
   *
   *  This is the whole point of the bar being honest: it can crawl toward 90
   *  but never reach 100 on a promise it cannot keep. A bar that hits 100 and
   *  then waits has told you a lie you can see. */
  ceiling: 90,

  /** Percent per second once the assets land. Deliberately a FLAT rate, not the
   *  decay above: decaying into 100 leaves a tail that crawls 98, 99, 99, 99 —
   *  measured at ~700ms of no visible change. Closing at a constant speed makes
   *  the bar visibly finish, which is also the honest reading: it stalled
   *  because it was waiting, and it sprints because the wait is over. */
  finishRate: 30,

  /** Floor for the whole load. Without it a warm cache finishes in ~80ms and
   *  the panel becomes a flash rather than an entrance. */
  minDuration: 2.2,

  /** Once full, hold a beat before leaving so 100% is actually read. */
  hold: 0.35,

  /** Panel rises out of the screen. */
  exit: 0.6,

  /** Hard stop on waiting for fonts and images. One hanging request must not
   *  keep a visitor staring at a dark panel. */
  assetsTimeout: 4,
} as const;

export const REVEAL = {
  duration: 0.55,
  quickDuration: 0.45,
  /** The hero starts rising when the panel is 38% of the way out. Sequenced
   *  strictly it reads as two separate moves. */
  overlap: 0.38,
} as const;
