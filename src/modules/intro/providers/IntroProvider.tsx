"use client";

import { useEffect, useMemo } from "react";

import { Preloader } from "../components/Preloader";
import { useIntroMachine } from "../hooks/use-intro-machine";
import { INTRO_TIMELINE, REVEAL } from "../intro.config";
import { IntroContext, type IntroContextValue } from "./intro-context";

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const { phase, progress, introRan } = useIntroMachine();

  const value = useMemo<IntroContextValue>(() => {
    const running = phase === "exiting";

    return {
      phase,
      gateOpen: phase === "exiting" || phase === "done",
      revealDelay: running ? INTRO_TIMELINE.exit * REVEAL.overlap : 0,
      revealDuration: introRan ? REVEAL.duration : REVEAL.quickDuration,
    };
  }, [phase, introRan]);

  useEffect(() => {
    document.documentElement.classList.toggle("intro-open", value.gateOpen);
  }, [value.gateOpen]);

  return (
    <IntroContext value={value}>
      {phase !== "done" && <Preloader phase={phase} progress={progress} />}
      {children}
    </IntroContext>
  );
}
