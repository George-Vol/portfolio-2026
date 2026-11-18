import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { tracks } from "@/content/tracks";
import { getAllWork } from "@/content/work";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Drafts stay out until they are real.
  const paths = [
    "",
    ...tracks.map((t) => `/${t.slug}`),
    ...(await getAllWork()).filter((w) => !w.draft).map((w) => `/${w.track}/work/${w.slug}`),
  ];
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}
