# ancungaulia

Personal portfolio of Aulia Nur Fajri Tri Anggoro. Software, mobile, and Web3 developer based in Yogyakarta, Indonesia.

Static site, no database and no CMS. Everything renders at build time.

## Stack

- Next.js 16 (App Router, Turbopack) with React 19 and TypeScript
- Tailwind CSS v4
- Motion for animation, Lenis for smooth scrolling
- three + postprocessing, for the PixelBlast background in the CTA

## Running it

Requires Node 20.9+ and pnpm.

```bash
pnpm install
pnpm dev     # http://localhost:3000
```

```bash
pnpm build   # production build
pnpm start   # serve the build
pnpm lint
```

## Routes

| Path               | What it is                         |
| ------------------ | ---------------------------------- |
| `/`                | Landing page, all sections         |
| `/about`           | About in full                      |
| `/projects`        | Every project                      |
| `/projects/[slug]` | One project in detail              |
| `/experience`      | Experience in full                 |
| `/cv`              | The CV PDF, rendered in the browser |

## Layout

```
app/          routes only, no UI logic
src/
  modules/    page UI, one folder per page
  components/ shared across pages (layout, motion, ui)
  data/       all site content
  lib/        helpers
public/       images, icons, CV
```

`app/` exists purely to render. Anything with real UI logic lives in `src/modules/`.

## Editing content

No code changes needed for any of this. It all lives in `src/data/`:

- `projects.ts` — projects, and `HOME_LIMIT` sets how many show on the landing page
- `experience.ts` — the experience accordion
- `about.ts` — about copy

Each project gets a folder under `public/images/<slug>/` holding `main.png` (the card) and `header.png` (the detail page), pointed at by the `image` and `header` fields. A project with neither renders the work-in-progress placeholder and is left out of the arc carousel on the landing page.

## Intro preloader

Timings live in `src/modules/intro/intro.config.ts`. `SHOW_ON_EVERY_LOAD` controls whether it plays on every visit or once per browser session.

The progress bar waits on real work: it stalls at `ceiling` until fonts and critical images have actually loaded, so 100% means something. `maxRate` caps how fast the number may move, which keeps a blocked main thread from teleporting it.
