"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { useScrollSpeed, useMotionOff, useOnScreen } from "./lerp";

export type ScrollVelocityProps = {
  children: ReactNode;
  baseSpeed?: number;
  /** Seberapa kuat onScroll mendorong lajunya. */
  boost?: number;
  direction?: -1 | 1;
  repeat?: number;
  className?: string;
  layers?: ReactNode;
  layerClassName?: string;
  trackClassName?: string;
};

/* Horizontal marquee whose speed follows page scroll. Both tracks receive the
   same translate so the two-tone layers stay aligned. */
export function ScrollVelocity({
  children,
  baseSpeed = 60,
  boost = 3,
  direction = -1,
  repeat = 4,
  className,
  layers,
  layerClassName,
  trackClassName,
}: ScrollVelocityProps) {
  const wrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const trackLapisan = useRef<HTMLDivElement>(null);
  const unit = useRef<HTMLSpanElement>(null);
  const lebarSatuan = useRef(0);
  const motionOff = useMotionOff();
  const diLayar = useOnScreen(wrap);

  useEffect(() => {
    const ukur = () => {
      lebarSatuan.current = unit.current?.offsetWidth ?? 0;
    };
    ukur();
    document.fonts?.ready.then(ukur).catch(() => {});
    window.addEventListener("resize", ukur);
    return () => window.removeEventListener("resize", ukur);
  }, []);

  useScrollSpeed({
    baseSpeed,
    boost,
    direction,
    loopLength: () => lebarSatuan.current,
    enabled: diLayar && !motionOff,
    onFrame: (pos) => {
      const geser = `translate3d(${-pos}px, 0, 0)`;
      if (track.current) track.current.style.transform = geser;
      if (trackLapisan.current) trackLapisan.current.style.transform = geser;
    },
  });

  const salinan = (content: ReactNode, refSatuan: boolean) =>
    Array.from({ length: repeat }).map((_, i) => (
      <span
        key={i}
        ref={refSatuan && i === 0 ? unit : undefined}
        aria-hidden={i > 0 ? true : undefined}
        className="shrink-0 whitespace-nowrap"
      >
        {content}
      </span>
    ));

  return (
    <div ref={wrap} className={`relative overflow-hidden ${className ?? ""}`}>
        <div
          ref={track}
          className={`flex w-max will-change-transform ${trackClassName ?? ""}`}
        >
        {salinan(children, true)}
      </div>

      {layers ? (
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 ${layerClassName ?? ""}`}
        >
          <div
            ref={trackLapisan}
            className={`flex w-max will-change-transform ${trackClassName ?? ""}`}
          >
            {salinan(layers, false)}
          </div>
        </div>
      ) : null}
    </div>
  );
}
