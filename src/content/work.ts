// Case studies are MDX files: src/content/work/<branch>/<slug>.mdx
// Drop a new file into a branch folder and it gets a card, a page and a sitemap entry. No registry to update.
// Files starting with "_" are ignored (see src/content/work/_template.mdx).

import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import type { MDXContent } from "mdx/types";
import { tracks } from "./tracks";

export type Image = { src: string; alt: string };

/** `export const meta = { ... }` at the top of each case-study file. */
export type WorkMeta = {
  title: string;
  summary: string; // one line, shown on the card
  role: string;
  year: string;
  cover: Image; // card image and the big image under the title
  tags?: string[]; // 3–4; omit to hide the tag row
  live?: string; // shows a "Visit live site" button
  repo?: string; // shows a "View code" button, e.g. a GitHub URL
  order?: number; // lower comes first on the branch page (default 100)
  size?: "large" | "normal"; // card width on the branch page (default: first card large)
  coverAspect?: string; // aspect ratio of the cover under the title, e.g. "16/9" (default) or "4/3"
  draft?: boolean; // shown on the site, hidden from Google and the sitemap
};

export type Work = WorkMeta & { slug: string; track: string; Content: MDXContent };

const root = join(process.cwd(), "src", "content", "work");

export async function getWork(track: string): Promise<Work[]> {
  const dir = join(root, track);
  if (!existsSync(dir)) return [];
  const slugs = readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map((f) => f.slice(0, -".mdx".length));

  const items = await Promise.all(
    slugs.map(async (slug) => {
      const mod = (await import(`./work/${track}/${slug}.mdx`)) as { default: MDXContent; meta?: WorkMeta };
      const m = mod.meta;
      // fail the build with a clear message instead of rendering a broken card
      if (!m?.title || !m.summary || !m.role || !m.year || !m.cover?.alt)
        throw new Error(`src/content/work/${track}/${slug}.mdx: "export const meta" needs title, summary, role, year and cover { src, alt }`);
      return { ...m, slug, track, Content: mod.default };
    }),
  );
  return items.sort((a, b) => (a.order ?? 100) - (b.order ?? 100) || a.title.localeCompare(b.title));
}

export const getAllWork = async () => (await Promise.all(tracks.map((t) => getWork(t.slug)))).flat();
