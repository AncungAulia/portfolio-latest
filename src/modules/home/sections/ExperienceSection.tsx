import { REST_DARK, CtaButton } from "@/components/layout/Navbar";
import { ClipRise } from "@/components/motion/ClipRise";
import { InViewGate } from "@/components/motion/InViewGate";
import { ExperienceList } from "@/modules/experience/components/ExperienceList";
import { EXPERIENCE, HOME_LIMIT } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="bg-sand pb-24 text-dark md:pb-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <InViewGate>
          <ClipRise
            as="h2"
            lines={["Experience"]}
            className="text-center text-[2rem] leading-[1.06] tracking-[-0.03em] md:text-[2.6rem]"
          />
        </InViewGate>

        <div className="mt-12 md:mt-16">
          <ExperienceList data={EXPERIENCE.slice(0, HOME_LIMIT)} />
        </div>

        <div className="mt-14 flex justify-center md:mt-20">
          <CtaButton
            href="/experience"
            label="View More"
            rest={REST_DARK}
            className="inline-flex h-10"
          />
        </div>
      </div>
    </section>
  );
}
