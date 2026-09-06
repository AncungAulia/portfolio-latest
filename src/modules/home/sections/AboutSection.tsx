import { REST_DARK, CtaButton } from "@/components/layout/Navbar";
import { AboutFields } from "@/modules/home/sections/AboutFields";
import { ClipRise } from "@/components/motion/ClipRise";
import { InViewGate } from "@/components/motion/InViewGate";
import { ABOUT_TITLE, ABOUT_INTRO } from "@/data/about";

/* Section "tentang" — kolom kiri lengket, kolom kanan bergulir */

const INTRO_DELAY = 0.12;

const PARA_GAP = 0.14;

export function About() {
  return (
    <section
      id="tentang"
      className="relative rounded-t-[28px] bg-sand px-6 py-24 text-dark md:rounded-t-[44px] md:px-10 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[minmax(0,24rem)_1fr] md:gap-20">
        <InViewGate className="md:self-start">
          <ClipRise
            as="h2"
            lines={ABOUT_TITLE}
            delay={0.08}
            className="text-[2rem] leading-[1.06] tracking-[-0.03em] text-balance md:text-[2.6rem]"
          />

          <div className="mt-7 md:mt-9">
            <CtaButton
              href="/about"
              label="View More"
              rest={REST_DARK}
              className="inline-flex h-10"
            />
          </div>
        </InViewGate>

        <div className="flex flex-col gap-6">
          <InViewGate className="flex max-w-prose flex-col gap-5">
            {ABOUT_INTRO.map((fg, i) => (
              <ClipRise
                key={i}
                as="p"
                lines={[fg]}
                delay={INTRO_DELAY + i * PARA_GAP}
                className="text-[15px] leading-relaxed text-neutral-525 md:text-base"
              />
            ))}
          </InViewGate>

          <InViewGate>
            <AboutFields />
          </InViewGate>
        </div>
      </div>
    </section>
  );
}
