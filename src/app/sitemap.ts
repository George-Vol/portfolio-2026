import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { tracks } from "@/content/tracks";

export default function sitemap(): MetadataRoute.Sitemap {
  // Drafts stay out until they are real.
  const paths = [
    "",
    ...tracks.map((t) => `/${t.slug}`),
    ...projects.filter((p) => !p.draft).map((p) => `/${p.track}/work/${p.slug}`),
  ];
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}
