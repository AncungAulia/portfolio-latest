import { Fragment, type ElementType } from "react";

export type ClipRiseProps = {
  lines: string[];
  as?: ElementType;
  className?: string;
  /** Delay before the first line, seconds. */
  delay?: number;
  lineGap?: number;
};

/* Text rises per LINE, top line first. Words stay split so a wrapping
   paragraph is clipped by its own boxes and appears in place instead of
   sliding up as one tall block. */
export function ClipRise({
  lines,
  as: Tag = "div",
  className,
  delay = 0,
  lineGap = 0.05,
}: ClipRiseProps) {
  const kataPerBaris = lines.map((l) => l.split(" ").filter(Boolean));

  return (
    <Tag className={className}>
      {kataPerBaris.map((kata, li) => {
        const d = (delay + li * lineGap).toFixed(3);

        return (
          <span key={li} className="block">
            {kata.map((k, wi) => (
              <Fragment key={`${li}-${wi}`}>
                <span className="clip-rise">
                  <span style={{ animationDelay: `${d}s` }}>{k}</span>
                </span>
                {wi < kata.length - 1 ? " " : null}
              </Fragment>
            ))}
          </span>
        );
      })}
    </Tag>
  );
}
