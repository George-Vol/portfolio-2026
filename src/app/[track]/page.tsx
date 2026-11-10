import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { About, AlsoBuilt, Contact, Hero, Skills, Work } from "@/components/sections";
import { projectsFor } from "@/content/projects";
import { getTrack, tracks } from "@/content/tracks";

// Every param is prerendered at build, so navigation is already instant; skip the dev-only Suspense check.
export const instant = false;
export const generateStaticParams = () => tracks.map((t) => ({ track: t.slug }));

export async function generateMetadata({ params }: PageProps<"/[track]">): Promise<Metadata> {
  const track = getTrack((await params).track);
  if (!track) return {};
  return {
    title: { absolute: track.seoTitle },
    description: track.seoDescription,
    alternates: { canonical: `/${track.slug}` },
    openGraph: {
      title: track.seoTitle,
      description: track.seoDescription,
      url: `/${track.slug}`,
      images: [{ url: track.ogImage, width: 1200, height: 630, alt: track.seoTitle }],
    },
  };
}

export default async function TrackPage({ params }: PageProps<"/[track]">) {
  const track = getTrack((await params).track);
  if (!track) notFound();

  // Section numbers stay sequential whether or not "Also built" is shown.
  let n = track.showAlsoBuilt ? 2 : 1;
  const next = () => String(++n).padStart(2, "0");

  return (
    <>
      <Hero track={track} />
      <Work projects={projectsFor(track.slug)} />
      {track.showAlsoBuilt && <AlsoBuilt />}
      <About index={next()} />
      <Skills track={track} index={next()} />
      <Contact index={next()} />
    </>
  );
}
