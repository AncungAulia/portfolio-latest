import Image from "next/image";

import { WorkInProgress } from "@/components/ui/WorkInProgress";
import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Navbar } from "@/components/layout/Navbar";
import { ClipRise } from "@/components/motion/ClipRise";
import { InViewGate } from "@/components/motion/InViewGate";
import { PROJECTS } from "@/data/projects";

/* Full archive. Cards stay thin on purpose: their job is to make you pick
   one, not to tell the story. That belongs to the detail page. */

export function Projects() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-sand text-dark">
        <PageHeader title="Projects" />

        <ul className="mx-auto grid w-full max-w-6xl gap-x-10 gap-y-20 px-6 pb-24 md:grid-cols-2 md:gap-x-14 md:px-10 md:pb-32">
          {PROJECTS.map(({ slug, title, role, image }, i) => (
            <li key={slug}>
              <a href={`/projects/${slug}`} className="group block">
                <InViewGate>
                  <div
                    className="card-zoom relative aspect-[16/10] overflow-hidden rounded-2xl bg-neutral-550"
                    style={{ animationDelay: `${(i * 0.04).toFixed(3)}s` }}
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
                    delay={0.1}
                    className="mt-5 text-[13px] text-neutral-525 md:text-[14px]"
                  />

                  <ClipRise
                    as="h2"
                    lines={[title]}
                    delay={0.16}
                    className="mt-2 text-[26px] leading-[1.1] tracking-[-0.03em] md:text-[36px]"
                  />

                </InViewGate>
              </a>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </>
  );
}
