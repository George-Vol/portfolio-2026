// A "track" is one side of the portfolio (/dev, /design, ...).
// To add a new one: add an entry here and tag projects with its slug in projects.ts.

import { skillRows } from "./site";

export type Track = {
  slug: string;
  name: string; // shown in the switcher
  label: string; // hero mono label
  headline: string;
  subhead: string;
  blurb: string; // shown on the home selector
  seoTitle: string;
  seoDescription: string;
  ogImage: string; // 1200×630 PNG in /public/og
  skills: typeof skillRows;
  showAlsoBuilt: boolean;
};

export const tracks: Track[] = [
  {
    slug: "dev",
    name: "Development",
    label: "// FULL-STACK DEVELOPER",
    headline: "Clean code. Scalable apps.",
    subhead: "I build fast, reliable web and mobile products with React, Next.js, TypeScript and Node.js.",
    blurb: "Web and mobile products, built end to end with React, Next.js, TypeScript and Node.js.",
    seoTitle: "George Volski — Full-Stack Developer",
    seoDescription:
      "Full-stack developer building fast, reliable web and mobile products with React, Next.js, TypeScript and Node.js.",
    ogImage: "/og/dev.png",
    skills: skillRows,
    showAlsoBuilt: true,
  },
  {
    slug: "design",
    name: "Design",
    label: "// UI/UX & GRAPHIC DESIGNER",
    headline: "Clear layouts. Real use.",
    subhead: "I design interfaces and graphics with an architect's eye for layout and detail, and I build what I design.",
    blurb: "Interfaces, design systems and graphic design, shaped by a background in architecture.",
    seoTitle: "George Volski — UI/UX & Graphic Design",
    seoDescription:
      "UI/UX and graphic design work by George Volski: web and mobile interfaces, design systems and visual design.",
    ogImage: "/og/design.png",
    skills: [skillRows[2], skillRows[0]],
    showAlsoBuilt: false,
  },
];

export const getTrack = (slug: string) => tracks.find((t) => t.slug === slug);
