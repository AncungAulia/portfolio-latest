
export type Experience = {
  place: string;
  /** Right column. */
  role: string;
  period: string;
  details: string[];
};

/** Newest first: latest end date on top, "Present" above everything, ties
 *  broken by start date. Keep new entries in that order. */
export const EXPERIENCE: Experience[] = [
  {
    place: "UGM Blockchain Club",
    role: "Staff, Front-End Division",
    period: "Nov 2025 — Present",
    details: [
      "Represented the club as a core builder across Monad, Superteam Solana Frontier, 0G, Turing, and Stellar APAC hackathons, prototyping and shipping functional dApp MVPs.",
      "Mentored members in Web3 front-end development: dApp interfaces, wallet integrations, and contract interactions.",
    ],
  },
  {
    place: "Sosmas KMTETI FT UGM",
    role: "Staff of Desa Binaan",
    period: "Nov 2025 — Present",
    details: [
      "Partnered with PT Telkom Indonesia (CSR) to execute HydroConnect in Pengos Village, Gunungkidul, bridging corporate sponsorship with student engineering to tackle rural clean water scarcity (UN SDG 6).",
      "Currently driving community development in Srimulyo Village, Bantul, upgrading local waste management infrastructure with local authorities.",
    ],
  },
  {
    place: "Industrial Engineering Student Catalyst",
    role: "Mentor of Programming Class",
    period: "Feb 2026 — Jun 2026",
    details: [
      "Mentored 10+ Industrial Engineering students in full-lifecycle web development, from HTML, CSS, and JavaScript fundamentals to live deployment with React and Vercel.",
    ],
  },
  {
    place: "180 Degrees Consulting UGM",
    role: "IT Analyst",
    period: "Aug 2025 — May 2026",
    details: [
      "Scaled the official web platform to 6,000+ unique users and 32,000+ total digital engagements.",
      "Delivered full-stack features in Next.js, TypeScript, and Tailwind CSS with Payload CMS, an AI-powered site assistant, and custom URL analytics.",
    ],
  },
  {
    place: "Google Developer Group on Campus",
    role: "Hacker",
    period: "Nov 2024 — Jun 2025",
    details: [
      "Built OhMyGERD, a cross-platform gamified health app in Flutter and Dart with real-time symptom tracking, daily habit logging, and an interactive reward system.",
      "Selected as a Top 50 APAC finalist in the Google Solution Challenge from 750+ teams across 12 countries (UN SDG 3).",
    ],
  },
];

export const HOME_LIMIT = 3;

export const ACHIEVEMENTS = [
  { label: "Instawards Grant Recipient ($5,000), Stellar Community Fund", year: "2026" },
  { label: "9th Finalist, Superteam Indonesia Hackathon", year: "2026" },
  { label: "Top 50 APAC Finalist, Google Solution Challenge", year: "2025" },
  { label: "2nd Place, Idea Competition, NEST Universitas Indonesia", year: "2025" },
  { label: "3rd Runner-up, Energy Policy Case Competition, Revogy SRE UGM", year: "2025" },
];
