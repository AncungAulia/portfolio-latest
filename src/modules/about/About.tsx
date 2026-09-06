import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Navbar } from "@/components/layout/Navbar";
import { ClipRise } from "@/components/motion/ClipRise";
import { InViewGate } from "@/components/motion/InViewGate";
import {
  FIELDS,
  SKILLS,
  ABOUT_INTRO,
  ABOUT_MORE,
  EDUCATION,
} from "@/data/about";

/* Home carries the intro and the four field pills. This page adds the full
   tech list and education, which is what gives it a reason to exist. */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-dark/12 pt-10 md:pt-14">
      <InViewGate>
        <ClipRise
          as="h2"
          lines={[title]}
          className="text-[1.5rem] leading-[1.1] tracking-[-0.03em] md:text-[2rem]"
        />
      </InViewGate>
      <div className="mt-7 md:mt-9">{children}</div>
    </section>
  );
}

export function About() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-sand text-dark">
        <PageHeader title="About" />

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 pb-24 md:gap-20 md:px-10 md:pb-32">
          <InViewGate className="flex max-w-prose flex-col gap-5">
            {[...ABOUT_INTRO, ...ABOUT_MORE].map((fg, i) => (
              <ClipRise
                key={i}
                as="p"
                lines={[fg]}
                delay={0.08 + i * 0.14}
                className="text-[16px] leading-relaxed text-neutral-525 md:text-[17px]"
              />
            ))}
          </InViewGate>

          <Section title="What I work on">
            <ul className="flex flex-wrap gap-2">
              {FIELDS.map((fg, i) => (
                <li key={fg} className="rounded-full bg-ember px-3 py-1 text-[13px] text-dark">
                  <ClipRise lines={[fg]} delay={i * 0.07} />
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Technical skills">
            <dl className="flex flex-col gap-6">
              {SKILLS.map(({ group, content }) => (
                <div key={group} className="grid gap-1.5 md:grid-cols-[minmax(0,11rem)_1fr] md:gap-8">
                  <dt className="text-[14px] text-dark md:text-[15px]">{group}</dt>
                  <dd className="text-[14px] leading-[1.6] text-neutral-525 md:text-[15px]">{content}</dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section title="Education">
            <ul className="flex flex-col gap-8">
              {EDUCATION.map(({ place, major, period, note }) => (
                <li
                  key={place}
                  className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <div className="min-w-0">
                    <p className="text-[1.1rem] leading-[1.2] tracking-[-0.02em] md:text-[1.35rem]">
                      {place}
                    </p>
                    <p className="mt-1 text-[14px] text-neutral-525 md:text-[15px]">
                      {major}
                      {note ? ` · ${note}` : ""}
                    </p>
                  </div>
                  <p className="shrink-0 text-[13px] text-neutral-525 md:text-[14px]">{period}</p>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </main>

      <Footer />
    </>
  );
}
