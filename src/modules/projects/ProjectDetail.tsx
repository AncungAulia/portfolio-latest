import Image from "next/image";
import { notFound } from "next/navigation";

import { WorkInProgress } from "@/components/ui/WorkInProgress";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ClipRise } from "@/components/motion/ClipRise";
import { InViewGate } from "@/components/motion/InViewGate";
import { findProject } from "@/data/projects";

/** Underline grows from the left on hover. `transition-[scale]`, NOT
 *  `transition-transform`: Tailwind v4 writes `scale-*` to its own property. */
function ExternalLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center gap-1.5 text-[15px] text-dark md:text-[16px]"
    >
      {label}
      <span aria-hidden className="text-[13px] text-neutral-525">
        &#8599;
      </span>
      <span
        aria-hidden
        className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-dark transition-[scale] duration-300 ease-[cubic-bezier(0.4,0,0.1,1)] group-hover:scale-x-100 motion-reduce:transition-none"
      />
    </a>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-dark/12 pt-4">
      <dt className="text-[12px] tracking-[0.04em] text-neutral-525">{label}</dt>
      <dd className="mt-2 text-[15px] leading-[1.5] md:text-[16px]">{children}</dd>
    </div>
  );
}

export async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = findProject(slug);

  // visible seperti project tanpa content.
  if (!project) notFound();

  const { title, role, period, stack, details, header, live, github } = project;

  return (
    <>
      <Navbar />

      <main className="flex-1 bg-sand text-dark">
        <div className="mx-auto w-full max-w-6xl px-6 pt-32 pb-24 md:px-10 md:pt-44 md:pb-32">
          <InViewGate>
            <ClipRise
              as="h1"
              lines={[title]}
              className="text-[2.6rem] leading-[1.02] tracking-[-0.035em] md:text-[4.5rem]"
            />
          </InViewGate>

          <div className="mt-12 md:mt-16">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-neutral-550 md:aspect-[16/7]">
              {header ? (
                <Image
                  src={header}
                  alt=""
                  fill
                  priority
                  sizes="(min-width: 1152px) 1072px, 92vw"
                  className="object-cover"
                />
              ) : (
                <WorkInProgress />
              )}
            </div>
          </div>

          <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-16">
            <dl className="flex flex-col gap-6">
              <Fact label="Role">{role}</Fact>
              {period ? <Fact label="Timeline">{period}</Fact> : null}
              <Fact label="Stack">
                <ul className="flex flex-wrap gap-1.5">
                  {stack.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-ember px-3 py-1 text-[12px] text-dark md:text-[13px]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </Fact>
            </dl>

            <div className="max-w-3xl">
              <ul className="flex flex-col gap-4 text-[15px] leading-[1.65] text-neutral-525 md:text-[16px]">
                {details.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-[0.6em] size-1 shrink-0 rounded-full bg-ember" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Links render only when they exist. A row of dead buttons says
                  less than no row at all. */}
              {live || github ? (
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 md:mt-10">
                  {live ? <ExternalLink href={live} label="Live site" /> : null}
                  {github ? <ExternalLink href={github} label="Source" /> : null}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-16 border-t border-dark/12 pt-8 md:mt-24">
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages --
                `<a>` throughout: navigation runs through the PageTransition click
                listener, and `<Link>` would navigate before it starts. */}
            <a
              href="/projects"
              className="text-[15px] text-neutral-525 underline-offset-4 hover:text-dark hover:underline md:text-[16px]"
            >
              &larr; All projects
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
