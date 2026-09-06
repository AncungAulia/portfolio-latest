"use client";

import { motion } from "motion/react";

import { EASE } from "@/components/motion/easing";
import { INTRO_TIMELINE } from "../intro.config";
import type { IntroPhase } from "../hooks/use-intro-machine";
import { ProgressWordmark } from "./ProgressWordmark";

export function Preloader({ phase, progress }: { phase: IntroPhase; progress: number }) {
  const leaving = phase === "exiting";

  return (
    <motion.div
      className="intro-panel fixed inset-x-0 top-0 z-[100] flex h-[100dvh] items-center justify-center bg-dark px-6 sm:px-10"
      initial={false}
      animate={{ y: leaving ? "-101%" : "0%" }}
      transition={{ duration: INTRO_TIMELINE.exit, ease: EASE.panel }}
      aria-hidden
    >
      <ProgressWordmark progress={progress} />

      <motion.div
        className="absolute inset-x-0 top-full h-[14vh] origin-top bg-dark"
        style={{ borderRadius: "0 0 50% 50% / 0 0 100% 100%" }}
        initial={false}
        animate={{ scaleY: leaving ? [0, 1, 0] : 0 }}
        transition={{
          duration: INTRO_TIMELINE.exit,
          times: [0, 0.45, 1],
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}
