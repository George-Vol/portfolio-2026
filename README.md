# George Volski — Portfolio

Next.js (App Router) + TypeScript + Tailwind v4. Fully static, no backend. Deploy by importing the repo on Vercel.

```bash
npm run dev
```

## Editing content (no component changes needed)

| What | Where |
| --- | --- |
| Name, email, LinkedIn, CV path, photo, about, skills, "Also built", home-page SEO | `src/content/site.ts` |
| Sides of the portfolio (`/dev`, `/design`, …): hero, work title, about, contact line, case-study headings, skills, SEO | `src/content/tracks.ts` |
| Case studies | `src/content/projects.ts` |

- **Add a case study:** add an object to `projects` with `track: "dev"` (or `"design"`). Its card and page (`/dev/work/<slug>`) are generated. Placeholders have `draft: true`, which keeps them out of Google and the sitemap; remove it when the real content is in.
- **Add a new side** (e.g. `/3d`): add an entry to `tracks` (with its own `ogImage`), then tag projects with that slug. It appears on the home selector. Visitors on a side never see links to the others.
- **Images:** put files in `public/work/<slug>/` and set `src: "/work/<slug>/cover.png"`. Any image with an empty `src` shows a labelled placeholder.
- **CV:** drop `George_Volski_CV.pdf` into `public/`. The "Download CV" button appears on the next build.
- **Photo:** put it in `public/about/` and set `site.photo`.
- **Domain:** set `NEXT_PUBLIC_SITE_URL` in Vercel (used for sitemap, canonical URLs and OG tags).
- **Link-preview images:** `public/og/home.png`, `dev.png`, `design.png` (1200×630 PNG). Replace a file to change it.

## Structure

- `src/app` — routes: `/` (selector), `/[track]`, `/[track]/work/[slug]`, `sitemap.ts`, `robots.ts`, `icon.svg` (favicon)
- `src/components/sections.tsx` — Hero, Work, Also built, About, Skills, Contact
- `src/components/Logo.tsx` — the G logo (favicon twin in `src/app/icon.svg`)
- `src/components/ui.tsx` — Button, Tag, Label, Section, Shot (image/placeholder)
- `src/components/InteractiveGrid.tsx` — cursor-reactive dot grid (canvas)
- `src/components/Effects.tsx` — scroll reveal + reflective card edges that follow the cursor
- Colours: CSS variables in `src/app/globals.css`. Dark only for now; light tokens and `ThemeToggle.tsx` are kept for later (see the comment in `Header.tsx`).
