"use client";

import dynamic from "next/dynamic";

import { REST_DARK, CtaButton } from "@/components/layout/Navbar";
import { ClipRise } from "@/components/motion/ClipRise";
import { InViewGate } from "@/components/motion/InViewGate";
import { useMotionOff } from "@/components/motion/lerp";

/* Section CTA */

const PixelBlast = dynamic(() => import("@/components/ui/PixelBlast"), { ssr: false });

const EMBER = "#ffad00";
const DARK = "#201d1d";

export function CTA() {
  const motionOff = useMotionOff();

  return (
    <section id="contact" className="relative overflow-hidden bg-sand text-dark">
      {!motionOff ? (
        <div aria-hidden className="cta-mask absolute inset-0">
          <PixelBlast
            variant="square"
            color={DARK}
            color2={EMBER}
            colorMix={0.5}
            pixelSize={4}
            patternScale={3.6}
            patternDensity={0.55}
            speed={0.4}
            liquid={false}
            enableRipples={false}
            edgeFade={0}
            autoPauseOffscreen
          />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-28 text-center md:gap-10 md:px-10 md:py-40">
        <InViewGate>
          <ClipRise
            as="h2"
            lines={["Let's craft", "your next product"]}
            className="text-[2.2rem] leading-[1.04] tracking-[-0.03em] md:text-[4rem]"
          />
        </InViewGate>

        <CtaButton
          href="https://linkedin.com/in/aulianurfajri"
          label="Contact Me"
          rest={REST_DARK}
          className="inline-flex h-11 text-[15px]"
        />
      </div>
    </section>
  );
}
