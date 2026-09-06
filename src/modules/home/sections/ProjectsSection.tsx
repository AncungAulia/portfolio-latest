import Image from "next/image";

import { WorkInProgress } from "@/components/ui/WorkInProgress";
import type { CSSProperties } from "react";

import { REST_DARK, CtaButton } from "@/components/layout/Navbar";
import { ClipRise } from "@/components/motion/ClipRise";
import { InViewGate } from "@/components/motion/InViewGate";
import { ProjectWheel, type WheelCard } from "@/modules/home/components/ProjectWheel";
import { PROJECTS, HOME_LIMIT } from "@/data/projects";

/* Only projects that HAVE an image. The wheel shows rather than reads, and an
   empty slot in a turning arc reads as a hole, not as work in progress. */
const WHEEL_CARDS: WheelCard[] = PROJECTS.filter((p) => p.image).map(({ title, image }) => ({
  title,
  image,
}));

/** Stagger between cards in one row, seconds. */
const CARD_STAGGER = 0.04;

export function Projects() {
  return (
    <section id="projects" className="bg-sand pt-20 pb-24 text-dark md:pt-24 md:pb-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <InViewGate>
          <ClipRise
            as="h2"
            lines={["Featured Projects"]}
            className="text-center text-[2rem] leading-[1.06] tracking-[-0.03em] md:text-[2.6rem]"
          />
        </InViewGate>
      </div>

      <div className="mt-12 md:mt-14">
        <ProjectWheel cards={WHEEL_CARDS} />
      </div>

      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <ul className="mt-8 grid gap-x-10 gap-y-20 md:mt-10 md:grid-cols-2 md:gap-x-14">
          {PROJECTS.slice(0, HOME_LIMIT).map(({ slug, title, role, image }, i) => {
            const base = i * CARD_STAGGER;

            return (
              <li key={slug}>
                <a href={`/projects/${slug}`} className="group block">
                  <InViewGate>
                    <div
                      className="card-zoom relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-550"
                      style={{ "--delay": `${base.toFixed(3)}s` } as CSSProperties}
                    >
                      {image ? (
                        <Image
                          src={image}
                          alt=""
                          fill
                          sizes="(min-width: 768px) 508px, 90vw"
                          className="object-cover transition-[scale] duration-500 ease-[cubic-bezier(0.4,0,0.1,1)] group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        />
                      ) : (
                        <WorkInProgress />
                      )}
                    </div>

                    <ClipRise
                      lines={[role]}
                      delay={base + 0.1}
                      className="mt-5 text-[13px] text-neutral-525 md:text-[14px]"
                    />

                    <ClipRise
                      lines={[title]}
                      delay={base + 0.16}
                      className="mt-2 text-[26px] leading-[1.1] tracking-[-0.03em] md:text-[36px]"
                    />
                  </InViewGate>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="mt-14 flex justify-center md:mt-20">
          <CtaButton
            href="/projects"
            label="View All"
            rest={REST_DARK}
            className="inline-flex h-10"
          />
        </div>
      </div>
    </section>
  );
}
