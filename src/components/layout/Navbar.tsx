"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type TransitionEvent,
} from "react";

import { useMotionOff } from "@/components/motion/lerp";
import { cn } from "@/lib/utils";

/* Dark bar hanging from the top edge. Links point to pages, not home sections. */
const LINKS = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
] as const;

const CTA = { label: "Let's Talk", href: "https://linkedin.com/in/aulianurfajri" } as const;

const NAME = "ancungaulia";

/** Avatar size inside its disc; the rest is breathing room. */
const AVATAR_INSET = "85%";

const CTA_PADDING = "px-4 md:px-5";

/** Two thresholds, not one, so the bar never flickers at the boundary. */
const DETACH_AT = 48;
const ATTACH_AT = 16;

const RIPPLE_EASE = "cubic-bezier(0.22,1,0.36,1)";
const RIPPLE_MS = 520;

/** Per-character delay of the roll, ms. */
const CHAR_STAGGER = 18;

const DARK = "var(--color-dark)";
const LIGHT = "var(--color-light)";

export function Navbar() {
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    const read = () => {
      const y = window.scrollY;
      setFloating((was) => (was ? y > ATTACH_AT : y > DETACH_AT));
    };

    read();
    window.addEventListener("scroll", read, { passive: true });
    return () => window.removeEventListener("scroll", read);
  }, []);

  const [menu, setMenu] = useState(false);
  const menuId = useId();

  // Never leave the phone menu open when the window widens past `md`: the panel
  // and its button are both `md:hidden`, so it becomes invisible stored state.
  useEffect(() => {
    if (!menu) return;

    const mq = window.matchMedia("(min-width: 48rem)");
    const check = () => {
      if (mq.matches) setMenu(false);
    };
    check();
    mq.addEventListener("change", check);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      mq.removeEventListener("change", check);
      window.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  return (
    // `overflow-x-clip`, not `-hidden`: hidden forces the other axis to `auto`
    // and would cut off anything hanging below.
    <header className="navbar-shell pointer-events-none fixed inset-x-0 top-0 z-40 flex justify-center overflow-x-clip">
      <nav
        aria-label="Main navigation"
        // Attributes are REMOVED when off, never set to "false" — an attribute
        // valued "false" still matches [data-floating].
        data-floating={floating ? "" : undefined}
        data-menu={menu ? "" : undefined}
        className="navbar-bar pointer-events-auto relative flex w-[calc(100vw-2.5rem)] flex-col rounded-b-2xl bg-dark px-2.5 text-light [--notch:12px] sm:px-3 md:w-auto md:rounded-b-[24px] md:[--notch:24px]"
      >
        <span aria-hidden className="notch notch-left" />
        <span aria-hidden className="notch notch-right" />

        <div className="flex h-14 items-center gap-2 md:h-15">
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages --
              `<a>` is deliberate: internal navigation runs through one document
              click listener (PageTransition) that calls router.push itself after
              the panel closes. `<Link>` would navigate first and skip it. */}
          <a
            href="/#top"
            aria-label={`${NAME}, back to top`}
            className="group flex shrink-0 items-center gap-0.5 md:gap-1"
          >
            {/* Tilts on hover. `transition-[rotate]`, NOT `transition-transform`:
                Tailwind v4 writes `rotate-*` to its own property. */}
            <span className="grid size-7 shrink-0 place-items-center overflow-hidden transition-[rotate] duration-300 ease-[cubic-bezier(0.4,0,0.1,1)] group-hover:rotate-6 motion-reduce:transition-none motion-reduce:group-hover:rotate-0 md:size-9">
              <Image
                src="/icons/icon.png"
                alt=""
                width={100}
                height={100}
                priority
                className="object-contain"
                style={{ width: AVATAR_INSET, height: AVATAR_INSET }}
              />
            </span>

            <span className="text-[12px] font-normal tracking-[-0.02em] md:text-[16px]">
              {NAME}
            </span>
          </a>

          <ul className="ml-3 hidden items-center gap-2 text-[12px] text-light/90 sm:gap-3 md:ml-12 md:flex md:gap-8 md:text-[14px]">
            {LINKS.map(({ label, href }) => (
              <li key={label}>
                <RollingLink href={href} label={label} />
              </li>
            ))}
          </ul>

          {/* `md:min-w-32` matches the logo+name group so the links stay centred
              in the bar. Tied to the length of NAME. */}
          <CtaButton
            href={CTA.href}
            label={CTA.label}
            className="ml-4 hidden h-8 md:ml-12 md:flex md:h-9 md:min-w-32"
          />

          <button
            type="button"
            onClick={() => setMenu((m) => !m)}
            aria-expanded={menu}
            aria-controls={menuId}
            aria-label={menu ? "Close menu" : "Open menu"}
            className="ml-auto grid size-9 shrink-0 place-items-center md:hidden"
          >
            <MenuIcon open={menu} />
          </button>
        </div>

        {/* 0fr to 1fr animates the real content height, so no height is guessed. */}
        <div
          id={menuId}
          className={`grid overflow-hidden transition-[grid-template-rows] duration-400 ease-[cubic-bezier(0.4,0,0.1,1)] motion-reduce:transition-none md:hidden ${
            menu ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0">
            <ul className="flex flex-col border-t border-light/12 pt-2">
              {LINKS.map(({ label, href }) => (
                <li key={label}>
                  {/* Plain link, not RollingLink: the roll is hover-driven and
                      phones have no hover. */}
                  <a
                    href={href}
                    onClick={() => setMenu(false)}
                    className="block py-2.5 text-center text-[15px] text-light/90"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-2 pb-3">
              <CtaButton
                href={CTA.href}
                label={CTA.label}
                onNavigate={() => setMenu(false)}
                className="flex h-10 w-full"
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

/**
 * Two-line menu icon that becomes a cross.
 *
 * The second line carries a delay so both lines never turn together.
 * `transition-[rotate,translate]`, NOT `transition-transform`.
 */
function MenuIcon({ open }: { open: boolean }) {
  const base =
    "absolute inset-x-0 h-[1.5px] rounded-full bg-light ease-[cubic-bezier(0.4,0,0.1,1)] transition-[rotate,translate] motion-reduce:transition-none";

  return (
    <span aria-hidden className="relative block h-[14px] w-[22px]">
      <span className={`${base} top-0 duration-300 ${open ? "translate-y-[6.25px] rotate-45" : ""}`} />
      <span
        className={`${base} bottom-0 delay-100 duration-500 ${open ? "-translate-y-[6.25px] -rotate-45" : ""}`}
      />
    </span>
  );
}

/** Nav link whose characters roll one by one, left to right. */
function RollingLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} aria-label={label} className="group block">
      <RollingChar label={label} />
    </a>
  );
}

/**
 * Stacked character roll. Each character holds two copies of itself; the stack
 * rises exactly one line so the second copy lands where the first was.
 *
 * `transition-[translate]`, NOT `transition-transform`: Tailwind v4 writes
 * `-translate-y-1/2` to the `translate` property.
 *
 * `leading-[1.5]` gives descenders room — "Projects" has a j.
 */
function RollingChar({ label, active }: { label: string; active?: boolean }) {
  return (
    <span aria-hidden className="flex leading-[1.5]">
      {[...label].map((char, i) => (
        <span key={i} className="block h-[1.5em] overflow-hidden">
          <span
            className={cn(
              "block transition-[translate] duration-500 ease-[cubic-bezier(0.4,0,0.1,1)] motion-reduce:transition-none",
              active ? "-translate-y-1/2" : "group-hover:-translate-y-1/2",
            )}
            style={{ transitionDelay: `${i * CHAR_STAGGER}ms` }}
          >
            <span className="block">{char === " " ? " " : char}</span>
            <span className="block">{char === " " ? " " : char}</span>
          </span>
        </span>
      ))}
    </span>
  );
}

type Ripple = {
  x: number;
  y: number;
  radius: number;
  /** Rising counter; also the stacking order. */
  seq: number;
  bg: string;
  fg: string;
  expanded: boolean;
  smooth: boolean;
};

/** Resting surface: light bar, dark text. */
const REST = { bg: LIGHT, fg: DARK } as const;

/** Inverted resting surface. Used by the hero and in-page buttons. */
export const REST_DARK = { bg: DARK, fg: LIGHT } as const;

/** One ripple colour for the whole site. Text must be dark: 8.95 against ember,
 *  light text only reaches 1.70. */
const RIPPLE_COLOR = { bg: "var(--color-ember)", fg: DARK } as const;

const RIPPLE_REST: Ripple = {
  x: 0,
  y: 0,
  radius: 0,
  seq: 0,
  bg: REST.bg,
  fg: REST.fg,
  expanded: false,
  smooth: false,
};

/** Cursor point clamped into the button box, plus the radius that covers it. */
function readPoint(e: MouseEvent<HTMLElement>) {
  const box = e.currentTarget.getBoundingClientRect();
  const x = Math.min(Math.max(e.clientX - box.left, 0), box.width);
  const y = Math.min(Math.max(e.clientY - box.top, 0), box.height);

  const radius = Math.max(
    Math.hypot(x, y),
    Math.hypot(box.width - x, y),
    Math.hypot(x, box.height - y),
    Math.hypot(box.width - x, box.height - y),
  );

  return { x, y, radius };
}

export function CtaButton({
  href,
  label,
  className,
  rest = REST,
  onNavigate,
}: {
  href: string;
  label: string;
  /** Display class comes from the caller; the rest belongs to this component
   *  because the ripple layers must match it pixel for pixel. */
  className?: string;
  /** Colour at rest. Also the colour released when the cursor leaves. */
  rest?: { bg: string; fg: string };
  /** Runs before navigation. Used to close the phone menu. */
  onNavigate?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [surface, setSurface] = useState(rest);
  // Two slots used ALTERNATELY, never one reused: with a single slot an
  // interrupted sweep restarts the same element from zero and flashes.
  const [ripple, setRipple] = useState<[Ripple, Ripple]>([RIPPLE_REST, RIPPLE_REST]);
  const slot = useRef(0);
  const seq = useRef(0);
  const motionOff = useMotionOff();

  const push = useCallback((next: { x: number; y: number; radius: number; bg: string; fg: string }) => {
    const i = slot.current;
    slot.current = 1 - i;
    seq.current += 1;

    const born: Ripple = { ...next, seq: seq.current, expanded: false, smooth: false };
    setRipple((prev) => (i === 0 ? [born, prev[1]] : [prev[0], born]));

    // Two frames, not one: one frame is not enough for the browser to register
    // the starting radius, and the circle would appear already grown.
    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        setRipple((prev) => {
          const now = prev[i];
          if (now.seq !== born.seq) return prev;
          const grown: Ripple = { ...now, expanded: true, smooth: true };
          return i === 0 ? [grown, prev[1]] : [prev[0], grown];
        }),
      ),
    );
  }, []);

  const onEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    setHovered(true);
    push({ ...readPoint(e), bg: RIPPLE_COLOR.bg, fg: RIPPLE_COLOR.fg });
  };

  const onLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    setHovered(false);
    push({ ...readPoint(e), bg: rest.bg, fg: rest.fg });
  };

  // Hand the finished colour to the base surface, then the ripple has nothing
  // left to paint. This is what removed the 1px rim in the resting state.
  const onDone = (e: TransitionEvent<HTMLSpanElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.propertyName !== "clip-path" && e.propertyName !== "-webkit-clip-path") return;

    const el = e.currentTarget;
    setSurface({ bg: el.dataset.bg ?? rest.bg, fg: el.dataset.fg ?? rest.fg });
  };

  // Newest ripple in FRONT. The gradients are painted as one background stack,
  // so their order has to match the text layers' z-index.
  const ordered = [...ripple].sort((a, b) => b.seq - a.seq);
  const last = ordered.length - 1;

  const rippleGradient = ordered
    .map(
      (r, i) =>
        `radial-gradient(circle at ${r.x}px ${r.y}px, ${r.bg} 0 calc(var(--ripple-${last - i}) - 0.5px), transparent calc(var(--ripple-${last - i}) + 0.5px))`,
    )
    .join(", ");

  const rippleRadii = Object.fromEntries(
    ordered.map((r, i) => [`--ripple-${last - i}`, `${r.expanded ? r.radius : 0}px`]),
  ) as CSSProperties;

  const rippleTransition =
    ordered
      .map((r, i) => (r.smooth ? `--ripple-${last - i} ${RIPPLE_MS}ms ${RIPPLE_EASE}` : null))
      .filter(Boolean)
      .join(", ") || "none";

  /** The ripple layer carries TEXT only; its background lives on the button. */
  const rippleStyle = (r: Ripple): CSSProperties => ({
    zIndex: r.seq,
    clipPath: `circle(${r.expanded ? r.radius : 0}px at ${r.x}px ${r.y}px)`,
    transition: r.smooth && !motionOff ? `clip-path ${RIPPLE_MS}ms ${RIPPLE_EASE}` : "none",
  });

  // Derived from the href, not passed as a prop: a prop can be forgotten, and an
  // outbound link without `rel` leaks this page as the referrer.
  const external = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      aria-label={external ? `${label} (opens in a new tab)` : label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onNavigate}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className={cn(
        // `justify-center` here AND on the ripple layers, always paired: with a
        // min-width the base text and its ripple copies would land apart.
        "relative shrink-0 items-center justify-center overflow-hidden rounded-full whitespace-nowrap",
        CTA_PADDING,
        className,
      )}
      style={{
        color: surface.fg,
        fontWeight: 500,
        fontSize: "14px",
        // Forces one transparency group so text anti-aliasing matches between
        // rest (subpixel) and hover (grayscale). 0.999, not 1: exactly 1 makes
        // no group at all.
        opacity: 0.999,
        backgroundColor: surface.bg,
        // Ripples are painted as gradients on the button's OWN background.
        // Stacked layers clipped to the same rounded edge produce a 1px rim.
        backgroundImage: rippleGradient,
        ...rippleRadii,
        transition: motionOff ? "none" : rippleTransition,
      }}
    >
      <RollingChar label={label} active={hovered} />

      {ripple.map((r, i) => (
        <span
          key={i}
          aria-hidden
          data-seq={r.seq}
          data-bg={r.bg}
          data-fg={r.fg}
          className={cn("absolute inset-0 flex items-center justify-center", CTA_PADDING)}
          style={rippleStyle(r)}
          onTransitionEnd={onDone}
        >
          {/* The TEXT BOX is painted, not the layer: painting the layer would
              bring the rim back, and leaving it unpainted lets the base text
              show through and double the glyphs. */}
          <span style={{ backgroundColor: r.bg, color: r.fg }}>
            <RollingChar label={label} active={hovered} />
          </span>
        </span>
      ))}
    </a>
  );
}
