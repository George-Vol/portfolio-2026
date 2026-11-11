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
  live?: string; // public URL; shows a "Visit live site" button on the case study
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

// Meridian: one project shown on both branches, told from the development side and the design side.
// Source: github.com/George-Vol/meridian and the "Fintech" Figma file. All figures in the screens are sample data.
const meridianImg = (file: string, alt: string): Image => ({ src: `/work/meridian/${file}`, alt });

const meridianDev: Project = {
  slug: "meridian",
  track: "dev",
  title: "Meridian, a digital bank I designed and built",
  summary: "A marketing site and a working web app that put a person's whole financial life in one view.",
  role: "Designer & Full-Stack Developer",
  year: "2026",
  live: "https://meridian-coral-alpha.vercel.app/",
  tags: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
  cover: meridianImg("dev-landing.webp", "Meridian landing page hero, designed in Figma"),
  problem:
    "Most people's money is spread across a bank app, a savings app, a brokerage and a card, so nobody has one clear picture. Meridian is a fictional digital bank I created to fix that: one view of everything, with plain-language insights about what changed and what you could do next.",
  built: [
    "A marketing site and a working preview of the logged-in app in Next.js, React and TypeScript, running entirely in the browser on sample data.",
    "Five app areas: Today, Accounts with search, filters, recategorising and split payments, Goals with a monthly plan that updates the finish date, Pay with a keypad and review step, and Insights.",
    "A client-side store where every action can be undone, plus tests for the state and goal-date logic using Node's built-in test runner.",
    "A component kit with no UI libraries, including a custom Select that follows the WAI-ARIA combobox pattern, and hover, focus, disabled and loading states on every control.",
    "Sign-up with inline validation, a one-click demo login, and full SEO: metadata, Open Graph images, sitemap and a web manifest.",
  ],
  design: {
    text: "I designed the product in Figma before building it, so the code follows one system. The brand idea is direction through understanding, and the home screen turns it into a route: a line from today's balance to each savings goal, ending at the star from the logo. Colours, type, radii and motion all come from the brand guidelines as Tailwind tokens.",
    images: [
      meridianImg("dev-ios.webp", "Meridian iOS screens in Figma: Today, Accounts, Goals and Pay"),
      meridianImg("dev-route.webp", "Set a goal, see the route: the route from today to each savings goal"),
    ],
  },
  result:
    "The public pages score 100 in Lighthouse for performance, accessibility, best practices and SEO. The app works from 320px phones to wide desktops, with full keyboard support and reduced-motion support.",
  gallery: [
    meridianImg("dev-overview.webp", "See where you stand: every account added up to one number"),
    meridianImg("dev-insights.webp", "It tells you what changed: the subscriptions insight"),
    meridianImg("dev-send.webp", "Send money: the review and sent screens"),
  ],
};

const meridianDesign: Project = {
  slug: "meridian",
  track: "design",
  title: "Meridian, brand identity and product design",
  summary: "A brand, an iOS app and a campaign for a digital bank, built around one idea: direction through understanding.",
  role: "Brand & Product Designer",
  year: "2026",
  live: "https://meridian-coral-alpha.vercel.app/",
  tags: ["Figma", "Brand identity", "iOS app", "Design system"],
  cover: meridianImg("design-website.webp", "Meridian homepage in a browser mockup"),
  problem:
    "A self-initiated brief: create a digital bank for professionals aged 25 to 40 whose money is spread across salary, savings, investments and cards. It needed the credibility of a traditional bank with the simplicity of modern fintech, and a product that gives people one clear picture instead of five apps.",
  built: [
    "The brand strategy and identity: Sage and Explorer archetypes, the line \"Financial intelligence for what's next\", and a symbol made of two overlaid, rotated nautical stars.",
    "A palette of Meridian Dark, Amber and Ivory, with a type system that switches between the brand fonts and free stand-ins through Figma variables.",
    "A 13-screen iOS prototype: welcome, sign-in, Today, insights, accounts, transactions, goals and a full send-money flow.",
    "Desktop and mobile landing pages, payment cards and the app icon.",
    "A campaign and brand touchpoints: billboard, posters, social posts, stationery and merchandise.",
  ],
  design: {
    text: "A meridian is the line navigators use to know exactly where they are, so the product shows where you are and the route to what's next. That line became the main interface element: an amber route from today's balance to each goal, ending at the star from the logo. Amber is used sparingly so it always means \"this is you\". Insights interpret instead of instruct: they say what changed and what you could do, and you decide.",
    images: [
      meridianImg("design-mobile-app.webp", "Meridian app: one balance across every account and an insights screen"),
      meridianImg("design-app-screens.webp", "Meridian app key screens: Today, an insight and the emergency fund goal"),
    ],
  },
  result:
    "A complete brand and product system in one Figma file, which I then built into a working web app. Every figure in the designs is sample data.",
  gallery: [
    meridianImg("design-responsive.webp", "The same Meridian page on desktop, tablet and mobile"),
  ],
};

export const projects: Project[] = [
  meridianDev,
  placeholder("project-two", "dev", 2),
  placeholder("project-three", "dev", 3),
  meridianDesign,
  { ...placeholder("design-two", "design", 2), role: "UI/UX Designer" },
  { ...placeholder("design-three", "design", 3), role: "UI/UX Designer" },
];

export const projectsFor = (track: string) => projects.filter((p) => p.track === track);
