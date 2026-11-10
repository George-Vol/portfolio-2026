// A "track" is one side of the portfolio (/dev, /design, ...).
// To add a new one: add an entry here and tag projects with its slug in projects.ts.

import { skillRows, skills } from "./site";

export type Track = {
  slug: string;
  name: string; // shown on the home selector
  label: string; // hero mono label
  headline: string;
  subhead: string;
  blurb: string; // shown on the home selector
  seoTitle: string;
  seoDescription: string;
  ogImage: string; // 1200×630 PNG in /public/og
  cv: string; // PDF in /public; the Download CV button only shows once the file exists
  workTitle: string; // heading of the "Selected work" section
  about: string;
  contact: [lead: string, tail: string]; // closing line, tail is shown muted
  caseLabels: { problem: string; built: string; decisions: string; result: string }; // case-study headings
  skills: { label: string; items: string[] }[];
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
    cv: "/George_Volski_CV.pdf",
    workTitle: "Products I've designed, built and shipped.",
    about:
      "I studied law, worked as a junior architect and 3D visualization artist, then taught myself to code. Architecture trained my eye for layout, detail and how people actually use a space, and I bring that to every interface I build. Today I build full-stack products end to end, from Figma designs to production code.",
    contact: ["Have a product to build?", "Let's talk."],
    caseLabels: { problem: "The problem", built: "What I built", decisions: "Design decisions", result: "Result" },
    skills: skillRows,
    showAlsoBuilt: true,
  },
  {
    slug: "design",
    name: "Design",
    label: "// UI/UX & GRAPHIC DESIGNER",
    headline: "Form follows use.",
    subhead:
      "I design web and mobile interfaces, design systems and visuals in Figma and Adobe Creative Suite, with an architect's eye for layout, proportion and detail.",
    blurb: "Interfaces, design systems, 3D visualization and graphics, shaped by a background in architecture.",
    seoTitle: "George Volski — UI/UX & Graphic Designer",
    seoDescription:
      "UI/UX and graphic design by George Volski: web and mobile interfaces, design systems, 3D visualization and campaign visuals, made in Figma and Adobe Creative Suite.",
    ogImage: "/og/design.png",
    cv: "/George_Volski_CV_Design.pdf",
    workTitle: "Interfaces and visuals, from first sketch to final screen.",
    about:
      "Before I designed screens, I designed buildings. As a junior architect and 3D visualization artist I learned proportion, light and how people move through a space. Now I bring that to interfaces: I design in Figma, refine through client reviews, and build component libraries that keep products consistent. And because I write the code too, my designs are made to ship.",
    contact: ["Have something that needs designing?", "Let's talk."],
    caseLabels: { problem: "The brief", built: "What I designed", decisions: "Key decisions", result: "Result" },
    skills: [
      { label: "Design", items: [...skills.design, "Design systems", "Prototyping", "Graphic design"] },
      { label: "3D and visualization", items: ["Blender", "Lumion", "Twinmotion", "Archicad"] },
      { label: "Build what I design", items: ["React", "Next.js", "Tailwind CSS"] },
    ],
    showAlsoBuilt: false,
  },
];

export const getTrack = (slug: string) => tracks.find((t) => t.slug === slug);
