import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

import { FrozenView } from "@/components/layout/FrozenView";
import { ScrollIndicator } from "@/components/layout/ScrollIndicator";
import { PageTransition } from "@/components/layout/PageTransition";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { IntroProvider, introBootScript } from "@/modules/intro";

/* One typeface for the whole site. Tabular figures are enabled on <body>. */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ancungaulia's portfolio",
  description:
    "Portfolio of Aulia Nur Fajri, a software, mobile, and Web3 developer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${manrope.variable}`}
      // The boot script below adds classes before hydration, so server and
      // client markup differ on purpose.
      suppressHydrationWarning
    >
      <head>
        {/* Must run before first paint, so it is inline rather than next/script. */}
        <script dangerouslySetInnerHTML={{ __html: introBootScript }} />
      </head>
      {/* `bg-light` matters: the about panel rises with rounded top corners and
          the body colour is what shows behind them. */}
      <body className="flex min-h-full flex-col bg-light font-sans tabular-nums">
        <SmoothScroll />
        {/* Outside IntroProvider: both live for the whole session, not just
            until the intro finishes. */}
        <PageTransition />
        <ScrollIndicator />
        {/* FrozenView holds the current page while the transition panel closes
            on back/forward, where the navigation itself cannot be held. */}
        <IntroProvider>
          <FrozenView>{children}</FrozenView>
        </IntroProvider>
      </body>
    </html>
  );
}
