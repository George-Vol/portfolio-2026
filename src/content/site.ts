// Everything shared across tracks. Edit copy here, not in components.

export const site = {
  name: "George Volski",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://georgev.vercel.app", // set NEXT_PUBLIC_SITE_URL in Vercel once the domain is final
  email: "volskigeorge@gmail.com",
  linkedin: "https://www.linkedin.com/in/george-volski",
  photo: "", // e.g. "/about/george.jpg" — empty shows a placeholder
  // Home page SEO. Each track has its own in tracks.ts.
  seoTitle: "George Volski — Developer & Designer",
  description:
    "George Volski builds and designs web and mobile products, from Figma designs to production code with React, Next.js, TypeScript and Node.js.",
  ogImage: "/og/home.png", // 1200×630 PNG in /public/og
};

export const skills = {
  development: ["TypeScript", "React", "Next.js", "React Native", "Node.js", "Laravel", "Tailwind CSS"],
  data: ["Firebase", "Supabase", "MongoDB", "MySQL", "Git", "CI/CD"],
  design: ["Figma", "UI/UX design", "Adobe Creative Suite"],
};

export const skillRows = [
  { label: "Development", items: skills.development },
  { label: "Data and tools", items: skills.data },
  { label: "Design", items: skills.design },
];

export const alsoBuilt = [
  { title: "Business-acquisition marketplace", kind: "Website" },
  { title: "E-learning platform", kind: "Landing page" },
  { title: "Writer & actor portfolio", kind: "Portfolio site" },
  { title: "Component library & UI kit", kind: "Used across client projects" },
];
