export type Project = {
  /** URL segment. Written by hand, never derived from the title: titles change,
   *  and a changed slug kills links already out in the world. */
  slug: string;
  title: string;
  /** Replaces the old chip row: one clear role separates projects better than
   *  four field labels that repeat across all of them. */
  role: string;
  /** Omitted where the exact dates are not confirmed; the row is then skipped. */
  period?: string;
  /** Detail page only. On cards it would repeat what the role already says. */
  stack: string[];
  /** One line for the home grid. */
  summary: string;
  /** Detail page bullets. */
  details: string[];
  /** 16:10, used by the wheel and every card. */
  image?: string;
  /** 16:7, header of the detail page. */
  header?: string;
  /** Public URL. Omitted when there is nothing live to visit. */
  live?: string;
  github?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "sterun",
    title: "Sterun",
    role: "Co-Founder & Software Developer",
    period: "Aug 2026 — Present",
    stack: ["Next.js", "TypeScript", "Soroban", "Stellar Wallets Kit", "USDC"],
    summary: "Non-transferable on-chain race records, from problem statement to MVP.",
    details: [
      "Architected a non-transferable race record protocol on Stellar and Soroban, turning real-world race fraud into a verifiable runner history model.",
      "Built the participant web app and a race-day scanner PWA, including TOTP-based on-site verification.",
      "Integrated Stellar Wallets Kit for USDC race-entry payments and public runner lookup.",
    ],
    github: "https://github.com/AncungAulia/sterun",
  },
  {
    slug: "sorosense",
    title: "SoroSense",
    role: "Software Developer",
    stack: ["Next.js", "TypeScript", "Stellar", "Soroban", "Turborepo"],
    summary: "Deposit-to-earn on Stellar, with an agent that rebalances for you.",
    details: [
      "Built a non-custodial, mobile-first deposit-to-earn app where an agent auto-allocates each currency bucket to the safest available yield.",
      "Implemented auto-compounding and auto-rebalancing inside a vetted pool set, so the user never picks a risk tier.",
      "Added a safety engine that runs invisibly and freezes a held pool the moment it turns toxic.",
    ],
    image: "/images/sorosense/main.png",
    header: "/images/sorosense/header.png",
    github: "https://github.com/AncungAulia/sorosense",
  },
  {
    slug: "tends",
    title: "Tends",
    role: "Software Developer",
    stack: ["Next.js", "TypeScript", "Mantle", "wagmi", "viem", "Privy", "GSAP"],
    summary: "AI-managed real-world-asset vaults on Mantle. You own the vault.",
    details: [
      "Built the front end for an AI-managed real-world-asset portfolio protocol where the vault stays owned by the depositor.",
      "Integrated embedded wallet auth, on-chain vault reads and writes, and live candlestick charts.",
      "Shipped a working MVP within the hackathon window.",
    ],
    image: "/images/tends/main.png",
    header: "/images/tends/header.png",
    live: "https://tends.fun",
    github: "https://github.com/AncungAulia/tends",
  },
  {
    slug: "wall-of-0gent",
    title: "Wall of 0gents",
    role: "Software Developer",
    stack: ["Next.js", "TypeScript", "0G Mainnet", "viem", "wagmi", "GSAP", "Three.js"],
    summary: "A trading floor for AI agents on 0G, built front to back in a weekend.",
    details: [
      "Built the entire front end for an AI-agent stock trading platform on 0G Mainnet.",
      "Wired wallet connection and on-chain reads through viem and wagmi, with the contract state driving every view.",
      "Handled the motion layer: GSAP sequences, a Three.js scene, and the swiping agent wall.",
    ],
    image: "/images/wall-of-0gent/main.png",
    header: "/images/wall-of-0gent/header.png",
    live: "https://wall-of-0gents.vercel.app",
    github: "https://github.com/Lexirieru/wall-of-0gents",
  },
  {
    slug: "tredie",
    title: "Tredie",
    role: "Software Developer",
    period: "Jan 2026",
    stack: ["Next.js", "React 19", "Solana", "Supabase", "Privy", "TradingView"],
    summary: "An attention-market protocol, shipped inside the hackathon window.",
    details: [
      "Built a decentralized attention-market protocol on Solana for trading real-time viral trends, shipped as a working dApp within the hackathon window.",
      "Integrated candlestick charts, embedded wallet auth, and a token candidate approval pipeline.",
      "Placed 9th out of the Superteam Indonesia Hackathon field.",
    ],
    image: "/images/tredie/main.png",
    header: "/images/tredie/header.png",
    live: "https://tredie.fun",
    github: "https://github.com/AncungAulia/tredie",
  },
  {
    slug: "nadient",
    title: "Nadient",
    role: "Software Developer",
    stack: ["Next.js", "TypeScript", "Monad", "Supabase", "Upstash Redis"],
    summary: "An on-chain game on Monad, playable straight from the faucet.",
    details: [
      "Built an on-chain game on Monad Testnet where players claim faucet tokens and play directly against the contract.",
      "Wired the front end to the game contract and kept round state in sync through Supabase and Redis.",
    ],
    image: "/images/nadient/main.png",
    header: "/images/nadient/header.png",
    live: "https://nadient.vercel.app",
    github: "https://github.com/AmeliaOchaM/Nadient",
  },
  {
    slug: "cia14th",
    title: "Civil in Action 14th",
    role: "Full-Stack Developer",
    period: "Feb 2026 — May 2026",
    stack: ["Next.js", "React 19", "TypeScript", "Firebase", "Resend", "Zod"],
    summary: "350+ team registrations across four national competitions.",
    details: [
      "Processed 350+ nationwide team registrations across 4 national competitions through an end-to-end event portal, removing manual handling from the entire submission workflow.",
      "Built multi-step registration forms with schema validation, automated Google Drive and Sheets pipelines, and transactional email verification.",
    ],
    image: "/images/cia14th/main.png",
    header: "/images/cia14th/header.png",
    live: "https://civilinaction14th.com",
    github: "https://github.com/civilinaction14th/cia14th",
  },
  {
    slug: "find-it",
    title: "Find It! UGM 2026",
    role: "Front-End Lead",
    period: "Dec 2025 — Mar 2026",
    stack: ["Next.js", "React 19", "TypeScript", "TanStack Query", "Zustand", "GSAP"],
    summary: "Scaled to 3,000+ participants and 1,000+ competing teams.",
    details: [
      "Scaled the official competition platform to serve 3,000+ participants and 1,000+ competing teams nationwide.",
      "Led a team of 5 front-end developers building responsive participant and admin dashboards.",
      "Owned the data layer on the client: query caching, global store, and submission flows.",
    ],
    image: "/images/find-it/main.png",
    header: "/images/find-it/header.png",
    live: "https://find-it.id",
    github: "https://github.com/finditugm26/findit26-frontend",
  },
  {
    slug: "kmteti",
    title: "KMTETI FT UGM",
    role: "Full-Stack Developer",
    stack: ["Next.js", "TypeScript", "Payload CMS", "PostgreSQL", "S3", "GSAP", "Lenis"],
    summary: "The student association site, editable by people who don't write code.",
    details: [
      "Built the official student association website end to end, from schema to motion.",
      "Set up Payload CMS on PostgreSQL with S3 storage so the committee can publish without touching the repo.",
      "Built the motion layer with GSAP and Lenis, including the scroll-driven sections.",
    ],
    image: "/images/kmteti/main.png",
    header: "/images/kmteti/header.png",
    live: "https://kmteti.org",
    github: "https://github.com/kmteti/website-bergelora",
  },
  {
    slug: "satu-teladan-app",
    title: "Satu Teladan",
    role: "Mobile Application Developer",
    period: "Aug 2025 — Jun 2026",
    stack: ["React Native", "Expo", "TypeScript", "Supabase"],
    summary: "Shipped to Google Play and the App Store, both reviews passed.",
    details: [
      "Shipped a cross-platform alumni app to both Google Play and the App Store, passing full store review on both platforms.",
      "Built the alumni directory, community contribution tracking, donation campaigns, and a real-time news feed, onboarding 100+ users.",
      "Handled auth, file uploads, and offline-tolerant storage on top of Supabase.",
    ],
    image: "/images/satu-teladan-app/main.png",
    header: "/images/satu-teladan-app/header.png",
    github: "https://github.com/Satu-Teladan-App",
  },
  {
    slug: "hydroconnect",
    title: "HydroConnect",
    role: "Mobile Application & IoT Developer",
    period: "Aug 2025 — Mar 2026",
    stack: ["C++", "ESP32", "React Native", "Expo", "Firebase", "Socket.IO"],
    summary: "ESP32 firmware and a live telemetry app for rural clean water.",
    details: [
      "Programmed ESP32 4G-LTE cellular modems in C++ for multi-sensor readings (pH, TDS, turbidity, temperature) and secure remote telemetry.",
      "Built the cross-platform mobile app with real-time telemetry over Socket.IO and push notifications.",
      "Deployed in Pengos Village, Gunungkidul to address rural clean water scarcity (UN SDG 6).",
    ],
    image: "/images/hydroconnect/main.png",
    header: "/images/hydroconnect/header.png",
    github: "https://github.com/HydroConnect",
  },
  {
    slug: "ohmygerd",
    title: "OhMyGERD",
    role: "Mobile App Developer",
    period: "Nov 2024 — Jun 2025",
    stack: ["Flutter", "Dart", "Firebase", "GoRouter", "Provider"],
    summary: "Top 50 APAC in the Google Solution Challenge, out of 750+ teams.",
    details: [
      "Built a cross-platform gamified health app in Flutter and Dart with real-time symptom tracking, daily habit logging, and an interactive reward system.",
      "Implemented auth, push notifications, and scheduled local reminders on Firebase.",
      "Selected as a Top 50 APAC finalist in the Google Solution Challenge from 750+ teams across 12 countries (UN SDG 3).",
    ],
    image: "/images/ohmygerd/main.png",
    header: "/images/ohmygerd/header.png",
    github: "https://github.com/scientivan/ohmygerd",
  },
];

/** How many the home grid reads out. The wheel uses every project that HAS an
 *  image — it shows rather than reads, so more entries is better. */
export const HOME_LIMIT = 4;

export function findProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
