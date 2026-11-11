# George Volski — Portfolio

Personal portfolio of George Volski, full-stack developer and designer.
One site with focused "branches": **/dev** for development work and **/design** for UI/UX and graphic design, with room for more.

**Live:** https://georgev.vercel.app

Built with Next.js, TypeScript and Tailwind CSS. Fully static: no backend and no database.

---

## Contents

- [How the site works](#how-the-site-works)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Editing content](#editing-content)
- [Images and files](#images-and-files)
- [Design system](#design-system)
- [SEO](#seo)
- [Accessibility and performance](#accessibility-and-performance)
- [Deployment](#deployment)

---

## How the site works

| Route | What it is |
| --- | --- |
| `/` | Branch selector: pick Development or Design. |
| `/dev` | Development portfolio: hero, selected work, also built, about, skills, contact. |
| `/design` | Design portfolio: same layout with design-specific copy, skills, case studies and CV. |
| `/dev/work/<slug>`, `/design/work/<slug>` | Case-study pages. |

Each branch is self-contained. A visitor who lands on `/dev` sees only development work. There is no link back to the selector or across to `/design`, and the logo scrolls back to the top of the current branch. Send people the link that fits them.

## Features

- **Branches as data.** Each branch (copy, skills, CV, SEO, preview image) is one entry in `src/content/tracks.ts`. Adding `/3d` or `/writing` needs no new components.
- **A CV per branch.** `/dev` links the development CV and `/design` the design CV. The Download CV button only appears once the branch's PDF exists.
- **Case studies as data.** Typed objects in `src/content/projects.ts` generate the cards and the pages.
- **Drafts.** Placeholder case studies are shown on the site but kept out of search engines and the sitemap.
- **Interactive dot grid.** A canvas background whose dots subtly grow and redden near the cursor.
- **Reflective cards.** Solid cards with a thin metallic edge that catches the light where the cursor is.
- **Scroll reveal and hover motion**, all turned off under `prefers-reduced-motion`.
- **Copy email** button next to the email and LinkedIn links.
- **Per-page SEO**: own title, description and static PNG preview image for home, `/dev` and `/design`.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, static generation)
- [React 19](https://react.dev) and [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Geist and Geist Mono](https://vercel.com/font) via `next/font`
- No other runtime dependencies

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:3000.

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (every page is prerendered) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Project structure

```
public/
  George_Volski_CV.pdf          # development CV  (/dev)
  George_Volski_CV_Design.pdf   # design CV       (/design)
  og/                           # link-preview images, 1200×630 PNG
    home.png  dev.png  design.png
src/
  app/
    page.tsx                    # /  (branch selector)
    [track]/page.tsx            # /dev, /design, …
    [track]/work/[slug]/        # case-study pages
    layout.tsx                  # fonts, metadata, header, footer, background
    globals.css                 # colour tokens, cards, reveal animation
    icon.svg                    # favicon
    sitemap.ts  robots.ts
  components/
    sections.tsx                # Hero, Work, Also built, About, Skills, Contact
    ui.tsx                      # Button, Tag, Label, Section, Shot (image or placeholder)
    Header.tsx  Footer.tsx  Logo.tsx  CopyEmail.tsx
    InteractiveGrid.tsx         # cursor-reactive dot grid (canvas)
    Effects.tsx                 # scroll reveal + card edge lighting
    ThemeToggle.tsx             # light theme, currently hidden
  content/
    site.ts                     # name, contact links, shared skills, "Also built"
    tracks.ts                   # one entry per branch
    projects.ts                 # case studies
```

## Editing content

All text lives in `src/content`. You should not need to touch components to change what the site says.

### Profile and contact: `site.ts`

Name, email, LinkedIn, home-page SEO, the shared skill lists and the "Also built" list.

### Branches: `tracks.ts`

Each branch sets:

- hero label, headline and subhead, and its blurb on the home selector
- work-section title, about text and contact line
- case-study headings (for example "What I built" on `/dev`, "What I designed" on `/design`)
- skills rows
- CV file, SEO title and description, and preview image

**Add a branch** (for example `/3d`):

1. Add an entry to `tracks` with `slug: "3d"`.
2. Add a 1200×630 PNG at `public/og/3d.png` and point `ogImage` at it.
3. Add its CV to `public/` and point `cv` at it (optional: no file, no button).
4. Tag projects with `track: "3d"`.

It appears on the home selector and gets its own pages and sitemap entry.

### Case studies: `projects.ts`

Add an object to `projects`:

```ts
{
  slug: "booking-app",              // URL: /dev/work/booking-app
  track: "dev",
  title: "Booking app for a clinic network",
  summary: "Online booking that replaced phone scheduling.",
  role: "Full-Stack Developer & Designer",
  year: "2025",
  tags: ["Next.js", "TypeScript", "Supabase"],   // 3–4; empty hides the row
  cover: { src: "/work/booking-app/cover.png", alt: "Booking app dashboard" },
  problem: "2–3 sentences on what was broken or missing.",
  built: ["What I built, 1", "What I built, 2", "What I built, 3"],
  design: {
    text: "Key design decisions and why.",
    images: [{ src: "/work/booking-app/figma-1.png", alt: "Figma screen" }],
  },
  result: "The real outcome. Never invent numbers.",
  gallery: [{ src: "/work/booking-app/shot-1.png", alt: "Booking flow" }],
}
```

The card on its branch and the case-study page are generated, and the "Next project" link cycles through the branch.

**Drafts.** The placeholder projects have `draft: true`. Drafts are visible on the site but marked `noindex` and left out of the sitemap. Remove the flag once the real content is in.

## Images and files

| File | Where it goes |
| --- | --- |
| Case-study images | `public/work/<slug>/…`, referenced as `/work/<slug>/…` |
| CVs | `public/`, one per branch, set by `cv` in `tracks.ts` |
| Link-preview images | `public/og/<branch>.png`, 1200×630 PNG |
| Logo and favicon | `src/components/Logo.tsx` and `src/app/icon.svg`, both from the "Logo" frame in the Portfolio Figma file |

Any image with an empty `src` renders a labelled, striped placeholder, so missing images are obvious but never break the layout.

## Design system

| Token | Value | Use |
| --- | --- | --- |
| Background | `#0E0E0D` | Page |
| Surface | `#1A1918` → `#262422` | Cards, raised elements |
| Text | `#F5F5F4` | Headings and body |
| Muted text | `#A39E98` | Secondary text |
| Brand red | `#BB1725` | Fills, focus, selection, glow, logo |
| Red text | `#F0505F` | Small red labels on dark (meets WCAG AA) |

- **Type:** Geist for headings and body, Geist Mono for labels and tags.
- **No blue anywhere.** Text selection, focus rings, tap highlights and form controls all use the brand red.
- **Details from architecture:** blueprint grid and corner marks in the hero, thin rules between sections, precise alignment.
- **Theme:** dark only for now. Light-theme tokens live in `globals.css` and the toggle in `ThemeToggle.tsx`; the comment in `Header.tsx` explains how to turn it back on.

All colours are CSS variables at the top of `src/app/globals.css`.

## SEO

- Per-page `<title>`, description and canonical URL.
- Static PNG Open Graph images per branch; case studies reuse their branch's image.
- `sitemap.xml` and `robots.txt` are generated from the content files, so new branches and published case studies are added automatically.
- Set `NEXT_PUBLIC_SITE_URL` if the site moves off `https://georgev.vercel.app`. It is used for the sitemap, canonical URLs and preview images.

## Accessibility and performance

Measured with Lighthouse (mobile, local production build) on `/dev` and `/design`:

| Performance | Accessibility | Best practices | SEO |
| --- | --- | --- | --- |
| 95–96 | 100 | 100 | 100 |

- Semantic landmarks, a skip-to-content link, alt text on every image and visible focus rings.
- Tap targets of at least 24px, and no horizontal scrolling from 320px wide up.
- `prefers-reduced-motion` turns off scroll reveals, transitions and the cursor effect.
- The hero headline (the largest element on the page) renders immediately, without animation.

## Deployment

The site is built for [Vercel](https://vercel.com):

1. Push this repository to GitHub.
2. Import it in Vercel. The defaults work; no environment variables are required.
3. Optionally set `NEXT_PUBLIC_SITE_URL` to your custom domain.

Every page is prerendered at build time and served from Vercel's CDN.

---

© George Volski. All rights reserved.
