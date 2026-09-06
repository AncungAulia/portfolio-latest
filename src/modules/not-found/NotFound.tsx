import { ArrowRight } from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageHeader } from "@/components/layout/PageHeader";

/* Every wrong URL lands here, so it offers somewhere to go rather
   than only an apology.

   Plain `<a>`, like the rest of the site: navigation runs through the
   PageTransition click listener, and `<Link>` would navigate before it starts. */
const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export function NotFound() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-sand text-dark">
        <PageHeader
          title="404"
          summary="This page does not exist. It may have moved, or the link that brought you here was wrong."
        />

        <div className="mx-auto w-full max-w-6xl px-6 pb-32 md:px-10 md:pb-44">
          <ul className="flex flex-col border-t border-dark/12">
            {LINKS.map(({ href, label }) => (
              <li key={href} className="border-b border-dark/12">
                <a
                  href={href}
                  className="group flex items-center justify-between gap-6 py-6 text-[1.5rem] leading-[1.12] tracking-[-0.03em] md:py-7 md:text-[2rem]"
                >
                  {label}
                  <ArrowRight
                    aria-hidden
                    className="size-5 text-neutral-525 transition-[translate] duration-300 ease-[cubic-bezier(0.4,0,0.1,1)] group-hover:translate-x-1 motion-reduce:transition-none md:size-6"
                    strokeWidth={1.8}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <Footer />
    </>
  );
}
