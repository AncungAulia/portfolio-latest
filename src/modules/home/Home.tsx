import { Fragment } from "react";

import { ClipRise } from "@/components/motion/ClipRise";
import { REST_DARK, Navbar, CtaButton } from "@/components/layout/Navbar";
import { Portrait } from "@/modules/home/components/Portrait";
import { Footer } from "@/components/layout/Footer";
import { CTA } from "@/modules/home/sections/CtaSection";
import { Experience } from "@/modules/home/sections/ExperienceSection";
import { Projects } from "@/modules/home/sections/ProjectsSection";
import { ScrollVelocity } from "@/components/motion/ScrollVelocity";
import { About } from "@/modules/home/sections/AboutSection";

const PERAN = ["Mobile Developer", "Frontend Developer", "Web3 Enthusiast"];

/** Hero */
function Pita({ className }: { className?: string }) {
  return (
    <span
      className={`flex items-baseline gap-[0.1em] pr-[0.1em] pb-[0.16em] text-[22vw] leading-[0.88] tracking-[-0.04em] whitespace-nowrap md:text-[12vw] ${className ?? ""}`}
    >
      {PERAN.map((role) => (
        <Fragment key={role}>
          <span>{role}</span>
          <Titik />
        </Fragment>
      ))}
    </span>
  );
}

const JUDUL_HERO = ["Crafting products,", "Shaping experiences."];
const PARAGRAF_HERO = [
  "I bridge the gap between robust system architecture and intuitive design. From clean code to seamless interfaces, I build scalable solutions that just work.",
];

export function Home() {
  return (
    <>
      <Navbar />

      <main
        id="top"
        className="relative isolate flex min-h-dvh flex-1 flex-col justify-end overflow-hidden bg-light text-dark"
      >
        <h1 className="sr-only">
          Aulia Nur Fajri, software, mobile, and Web3 developer
        </h1>

        <Portrait />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-[var(--hero-text)] flex-col items-center justify-center gap-4 px-6 pt-12 text-center sm:gap-5 sm:pt-14 xl:hidden">
          <ClipRise
            lines={JUDUL_HERO}
            delay={0.16}
            className="text-[26px] leading-[1.15] tracking-[-0.02em] sm:text-[36px]"
          />
          <ClipRise
            lines={PARAGRAF_HERO}
            delay={0.26}
            className="max-w-[26rem] text-[13px] leading-snug text-neutral-525 sm:text-[15px]"
          />
          <CtaButton
            href="/cv"
            label="View CV"
            rest={REST_DARK}
            className="pointer-events-auto mt-1 inline-flex h-10"
          />
        </div>

        <div className="absolute inset-x-0 top-[30%] z-10 hidden -translate-y-1/2 items-center justify-between px-12 xl:flex">
          <ClipRise
            lines={JUDUL_HERO}
            delay={0.16}
            className="max-w-[25rem] text-[40px] leading-[1.15] tracking-[-0.02em] 2xl:text-[40px]"
          />
        </div>
        <div className="max-w-[25rem] absolute top-[40%] z-10 hidden translate-y-1/2 items-center justify-between px-12 right-0 xl:block">
          <ClipRise
            lines={PARAGRAF_HERO}
            delay={0.26}
            className="text-[15px] leading-snug text-neutral-525"
          />
          <CtaButton
            href="/cv"
            label="View CV"
            rest={REST_DARK}
            className="pointer-events-auto mt-5 inline-flex h-10"
          />
        </div>

        <div aria-hidden className="relative z-10">
          <ScrollVelocity
            baseSpeed={70}
            boost={3}
            repeat={2}
            className="pb-2 md:pb-3"
            layers={<Pita className="text-light" />}
            layerClassName="marquee-mask"
            trackClassName="marquee-rise"
          >
            <Pita />
          </ScrollVelocity>
        </div>
      </main>

      <About />

      <Projects />

      <Experience />

      <CTA />

      <Footer />
    </>
  );
}

function Titik() {
  return (
    <span aria-hidden className="self-center text-[0.3em] text-neutral-475">
      •
    </span>
  );
}
