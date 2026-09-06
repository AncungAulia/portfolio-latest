"use client";

import { useId, useRef, useState } from "react";

import { ClipRise } from "@/components/motion/ClipRise";
import { InViewGate } from "@/components/motion/InViewGate";
import { OpenCursor } from "@/components/motion/OpenCursor";
import type { Experience } from "@/data/experience";

/* Shared by the home section (top 3) and /experience (all).
   Panels animate `grid-template-rows` 0fr->1fr, so no height is ever guessed. */
export function ExperienceList({ data }: { data: Experience[] }) {
  const list = useRef<HTMLUListElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const panelId = useId();

  return (
    <>
      <ul ref={list} className="border-t border-dark/12 md:cursor-none">
        {data.map(({ place, role, period, details }, i) => {
          const open = openIndex === i;
          const id = `${panelId}-${i}`;

          return (
            <li key={place} className="border-b border-dark/12">
              <h3>
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  aria-controls={id}
                  className="exp-row group relative flex w-full flex-col items-start gap-1.5 py-7 text-left sm:flex-row sm:items-baseline sm:gap-6 md:cursor-none md:gap-10 md:py-9"
                >
                  <InViewGate className="min-w-0 flex-1">
                    <ClipRise
                      lines={[place]}
                      className="text-[1.5rem] leading-[1.12] tracking-[-0.03em] sm:text-[1.9rem] md:text-[2.4rem]"
                    />
                  </InViewGate>

                  <span className="shrink-0 sm:text-right">
                    <InViewGate>
                      <ClipRise
                        lines={[role]}
                        className="text-[13px] leading-[1.3] md:text-[15px]"
                      />
                      <ClipRise
                        lines={[period]}
                        delay={0.05}
                        className="mt-1 text-[12px] leading-[1.3] text-neutral-525 md:text-[13px]"
                      />
                    </InViewGate>
                  </span>

                  {/* `transition-[rotate]`, never `transition-transform`:
                      Tailwind v4 writes rotate to its own CSS property. */}
                  <span
                    aria-hidden
                    className="exp-chevron absolute top-1/2 right-0 -translate-y-1/2 text-dark/40"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`size-[18px] transition-[rotate] duration-300 ease-[cubic-bezier(0.4,0,0.1,1)] motion-reduce:transition-none ${
                        open ? "rotate-180" : ""
                      }`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </button>
              </h3>

              <div
                id={id}
                role="region"
                className={`exp-panel grid ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <ul className="max-w-3xl space-y-3 pb-8 text-[14px] leading-[1.6] text-neutral-525 md:text-[15px]">
                    {details.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-[0.55em] size-1 shrink-0 rounded-full bg-ember" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <OpenCursor area={list} label={openIndex === null ? "OPEN" : "CLOSE"} />
    </>
  );
}
