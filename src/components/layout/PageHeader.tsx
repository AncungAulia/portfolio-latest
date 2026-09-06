import { ClipRise } from "@/components/motion/ClipRise";
import { InViewGate } from "@/components/motion/InViewGate";

/* Shared header for inner pages. `pt` is large because the navbar floats
   over the top of the screen. */

export function PageHeader({
  title,
  summary,
}: {
  title: string;
  summary?: string;
}) {
  return (
    <header className="mx-auto w-full max-w-6xl px-6 pt-32 pb-14 md:px-10 md:pt-44 md:pb-20">
      <InViewGate>
        <ClipRise
          as="h1"
          lines={[title]}
          className="text-[2.6rem] leading-[1.02] tracking-[-0.035em] md:text-[4.5rem]"
        />
      </InViewGate>

      {summary ? (
        <InViewGate>
          <ClipRise
            as="p"
            lines={[summary]}
            delay={0.1}
            className="mt-5 max-w-prose text-[15px] leading-relaxed text-neutral-525 md:mt-6 md:text-base"
          />
        </InViewGate>
      ) : null}
    </header>
  );
}
