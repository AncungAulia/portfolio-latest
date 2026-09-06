"use client";

import Image from "next/image";
import { useRef } from "react";

import { useScrollSpeed, useMotionOff, useOnScreen } from "@/components/motion/lerp";

export type WheelCard = {
  /** Also used as the React key. */
  title: string;
  /** File in public/. Empty renders a correctly sized placeholder. */
  image?: string;
};

/** Wheel radius in px. Below ~1200 the arc reads as a fan, not a wheel. */
const RADIUS = { small: 1150, large: 1900 };

/** Card width and gap in px. Both feed the angle math, so changing one respaces the wheel. */
const CARD = { small: { width: 220, gap: 24 }, large: { width: 380, gap: 40 } };

/** Rendered slots. Must cover the widest screen plus one card per side. */
const SLOT_COUNT = 9;

export function ProjectWheel({ cards }: { cards: WheelCard[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const slots = useRef<(HTMLElement | null)[]>([]);
  const motionOff = useMotionOff();
  const onScreen = useOnScreen(viewport);

  // Read inside the frame, not at render: it depends on the breakpoint.
  const metrics = () => {
    const large = window.matchMedia("(min-width: 48rem)").matches;
    const card = large ? CARD.large : CARD.small;
    const radius = large ? RADIUS.large : RADIUS.small;
    // Angle between cards, derived from arc length so spacing stays correct.
    const step = ((card.width + card.gap) / radius) * (180 / Math.PI);
    return { radius, step, span: step * SLOT_COUNT };
  };

  useScrollSpeed({
    baseSpeed: 3.2,
    boost: 0.09,
    direction: -1,
    loopLength: () => metrics().span,
    enabled: onScreen && !motionOff,
    onFrame: (angle) => {
      const { radius, step, span } = metrics();
      const half = span / 2;

      slots.current.forEach((el, i) => {
        if (!el) return;
        // Wrapped into one visible turn; without this cards shift once and vanish.
        const t = ((((i * step + angle + half) % span) + span) % span) - half;
        el.style.transform = `translate(-50%, -50%) rotate(${t.toFixed(3)}deg) translateY(${-radius}px)`;
        el.style.zIndex = String(100 - Math.round(Math.abs(t)));
      });
    },
  });

  // Never set `--radius` inline here: it would beat the media query and the
  // layout would use the phone radius while JS computes with the desktop one.
  return (
    <div ref={viewport} aria-hidden className="wheel-window">
      <div className="wheel-pivot">
        {Array.from({ length: SLOT_COUNT }).map((_, i) => {
          const card = cards[i % cards.length];
          return (
            <article
              key={i}
              ref={(el) => {
                slots.current[i] = el;
              }}
              className="wheel-card"
            >
              {card.image ? (
                <Image
                  src={card.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 380px, 220px"
                  className="object-cover"
                />
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
