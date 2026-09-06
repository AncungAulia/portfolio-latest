import { Footer } from "@/components/layout/Footer";
import { PageHeader } from "@/components/layout/PageHeader";
import { REST_DARK, CtaButton } from "@/components/layout/Navbar";
import { Navbar } from "@/components/layout/Navbar";

/* Renders the PDF itself rather than rebuilding it in HTML: a rebuilt CV
   drifts from the one actually sent out.

   `<object>`, not `<iframe>`: iOS Safari and most Android browsers have no
   inline PDF viewer, and only `<object>` renders its own fallback there. */

const FILE = "/cv-aulia-nur-fajri.pdf";

export function Cv() {
  return (
    <>
      <Navbar />

      <main className="flex-1 bg-sand text-dark">
        <PageHeader title="CV" />

        <div className="mx-auto w-full max-w-6xl px-6 pb-24 md:px-10 md:pb-32">
          <div className="flex flex-wrap gap-3">
            <CtaButton
              href={FILE}
              label="Download PDF"
              rest={REST_DARK}
              className="inline-flex h-10"
            />
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl bg-neutral-550 md:mt-10">
            <object
              data={FILE}
              type="application/pdf"
              aria-label="CV Aulia Nur Fajri Tri Anggoro"
              className="block h-[75vh] min-h-[520px] w-full md:h-[calc(100vh-14rem)]"
            >
              <div className="flex flex-col items-start gap-4 p-8 text-light md:p-12">
                <p className="max-w-prose text-[15px] leading-relaxed md:text-base">
                  Your browser can&rsquo;t display PDFs inline. Open it in a new
                  tab instead.
                </p>
                <a
                  href={FILE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-light px-5 py-2.5 text-[14px] text-dark"
                >
                  Open CV
                </a>
              </div>
            </object>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
