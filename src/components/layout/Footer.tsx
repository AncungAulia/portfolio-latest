/* Footer */

const EXPLORE = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
];

const SOCIAL = [
  { label: "LinkedIn", href: "https://linkedin.com/in/aulianurfajri" },
  { label: "Instagram", href: "https://instagram.com/ancungauliaa" },
  { label: "X / Twitter", href: "https://x.com/ancoenggg" },
];

const EMAIL = "ancungaulia@gmail.com";

function Column({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="text-[12px] tracking-[0.06em] text-neutral-525">
        {title}
      </h2>
      <div className="mt-5 md:mt-6">{children}</div>
    </div>
  );
}

const LINK_CLASS =
  "relative inline-block text-[17px] text-dark md:text-[18px] " +
  "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 " +
  "after:bg-dark after:transition-[scale] after:duration-300 after:ease-[cubic-bezier(0.4,0,0.1,1)] " +
  "hover:after:scale-x-100 motion-reduce:after:transition-none";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-sand pt-20 text-dark md:pt-28">
      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 sm:gap-8">
          <Column title="Explore">
            <ul className="space-y-3">
              {EXPLORE.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className={LINK_CLASS}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Column>

          <Column title="Connect">
            <ul className="space-y-3">
              {SOCIAL.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK_CLASS}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Column>

          <Column title="Contact" className="col-span-2 sm:col-span-1">
            <a href={`mailto:${EMAIL}`} className={`${LINK_CLASS} break-all`}>
              {EMAIL}
            </a>
            <p className="mt-5 text-[17px] leading-[1.5] text-neutral-525 md:text-[18px]">
              Based in Yogyakarta,
              <br />
              Indonesia
            </p>
          </Column>
        </div>

        <p
          aria-hidden
          className="footer-wordmark pointer-events-none relative z-20 mt-20 leading-[0.85] tracking-[-0.04em] md:mt-28"
        >
          ancungaulia
        </p>

        <div className="flex justify-end pt-8 pb-8 md:pt-10 md:pb-10">
          <p className="text-[10px] md:text-[12px]  tracking-[0.04em] text-neutral-525">
            © {new Date().getFullYear()} Aulia Nur Fajri Tri Anggoro. All rights
            reserved.
          </p>
        </div>
      </div>

      <div aria-hidden className="footer-blob" />
    </footer>
  );
}
