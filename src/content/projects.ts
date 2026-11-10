// Case studies. Add a new object to `projects` and the card, page and sitemap entry appear automatically.
// Images: drop files in /public/work/<slug>/ and set the paths below. Empty strings render a labelled placeholder.
// Never invent numbers or client names; keep "[Add ...]" until the real content exists.

export type Image = { src: string; alt: string };

export type Project = {
  slug: string;
  draft?: boolean; // true = placeholder: shown on the site but hidden from Google and the sitemap
  track: string; // matches a slug in tracks.ts
  title: string;
  summary: string; // one line, shown on the card
  role: string;
  year: string;
  tags: string[]; // 3–4; leave empty to hide the tag row
  cover: Image;
  problem: string;
  built: string[]; // 3–5 bullets
  design: { text: string; images: Image[] }; // 1–2 Figma screenshots
  result: string;
  gallery: Image[];
};

const placeholder = (slug: string, track: string, n: number): Project => ({
  slug,
  draft: true, // remove once the real content is in
  track,
  title: `[Project ${n} title]`,
  summary: "[One line: what it is and who it is for]",
  role: "Full-Stack Developer & Designer",
  year: "[Year]",
  tags: [], // add real tags per project
  cover: { src: "", alt: `Project ${n} cover` },
  problem: "[2–3 sentences: who had the problem, what was broken or missing, and why it mattered.]",
  built: ["[What I built — 1]", "[What I built — 2]", "[What I built — 3]"],
  design: {
    text: "[Short paragraph: the key design decisions and why they were made.]",
    images: [
      { src: "", alt: `Project ${n} Figma screen 1` },
      { src: "", alt: `Project ${n} Figma screen 2` },
    ],
  },
  result: "[Add outcome]",
  gallery: [
    { src: "", alt: `Project ${n} screenshot 1` },
    { src: "", alt: `Project ${n} screenshot 2` },
    { src: "", alt: `Project ${n} screenshot 3` },
  ],
});

export const projects: Project[] = [
  placeholder("project-one", "dev", 1),
  placeholder("project-two", "dev", 2),
  placeholder("project-three", "dev", 3),
  { ...placeholder("design-one", "design", 1), role: "UI/UX Designer" },
  { ...placeholder("design-two", "design", 2), role: "UI/UX Designer" },
  { ...placeholder("design-three", "design", 3), role: "UI/UX Designer" },
];

export const projectsFor = (track: string) => projects.filter((p) => p.track === track);
