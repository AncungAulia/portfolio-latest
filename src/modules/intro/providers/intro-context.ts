"use client";

import { createContext, useContext } from "react";

import type { IntroPhase } from "../hooks/use-intro-machine";

export type IntroContextValue = {
  phase: IntroPhase;
  gateOpen: boolean;
  revealDelay: number;
  revealDuration: number;
};

export const IntroContext = createContext<IntroContextValue | null>(null);

export function useIntro() {
  return useContext(IntroContext);
}
