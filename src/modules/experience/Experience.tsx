import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Navbar } from "@/components/layout/Navbar";
import { ClipRise } from "@/components/motion/ClipRise";
import { InViewGate } from "@/components/motion/InViewGate";
import { ExperienceList } from "@/modules/experience/components/ExperienceList";
import { ACHIEVEMENTS, EXPERIENCE } from "@/data/experience";

/* Home shows the top three. This page shows all of them plus achievements. */

export function Experience() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-sand text-dark">
        <PageHeader title="Experience" />

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-24 md:gap-24 md:px-10 md:pb-32">
          <ExperienceList data={EXPERIENCE} />

          <section>
            <InViewGate>
              <ClipRise
                as="h2"
                lines={["Achievements"]}
                className="text-[1.5rem] leading-[1.1] tracking-[-0.03em] md:text-[2rem]"
              />
            </InViewGate>

            <ul className="mt-7 flex flex-col md:mt-9">
              {ACHIEVEMENTS.map(({ fg, tahun }) => (
                <li
                  key={fg}
                  className="flex flex-col gap-1 border-b border-dark/12 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <span className="text-[15px] leading-[1.45] md:text-[16px]">{fg}</span>
                  <span className="shrink-0 text-[13px] text-neutral-525 md:text-[14px]">
                    {tahun}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
