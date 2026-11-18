import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blueprint } from "@/components/sections";
import { Arrow, Button, Shot, Tag } from "@/components/ui";
import { getTrack } from "@/content/tracks";
import { getAllWork, getWork } from "@/content/work";

// Every param is prerendered at build, so navigation is already instant; skip the dev-only Suspense check.
export const instant = false;
export const generateStaticParams = async () => (await getAllWork()).map((w) => ({ track: w.track, slug: w.slug }));

const find = async (track: string, slug: string) => (await getWork(track)).find((w) => w.slug === slug);

export async function generateMetadata({ params }: PageProps<"/[track]/work/[slug]">): Promise<Metadata> {
  const { track, slug } = await params;
  const w = await find(track, slug);
  if (!w) return {};
  const url = `/${track}/work/${slug}`;
  return {
    title: w.title,
    description: w.summary,
    alternates: { canonical: url },
    ...(w.draft && { robots: { index: false } }),
    // shortcut: case studies reuse their track's OG image; add a per-project image field if one is ever needed
    openGraph: { title: w.title, description: w.summary, url, images: getTrack(track)?.ogImage },
  };
}

export default async function CaseStudy({ params }: PageProps<"/[track]/work/[slug]">) {
  const { track, slug } = await params;
  const list = await getWork(track);
  const w = list.find((x) => x.slug === slug);
  if (!w) notFound();
  const next = list[(list.indexOf(w) + 1) % list.length];

  return (
    <article className="relative isolate">
      <Blueprint />
      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16">
        <Link href={`/${track}#work`} className="-my-2 inline-flex items-center gap-2 py-2 font-mono text-xs text-muted transition-colors hover:text-accent-ink">
          <Arrow className="-rotate-135" /> All work
        </Link>

        <header className="mt-10 sm:mt-14">
          <h1 className="max-w-4xl text-4xl leading-[1] font-semibold tracking-[-0.04em] text-balance sm:text-7xl">
            {w.title}
          </h1>
          <dl className="reveal mt-10 grid gap-6 border-t border-line pt-6 font-mono text-xs sm:grid-cols-3">
            <div>
              <dt className="text-muted">Role</dt>
              <dd className="mt-1.5 text-fg">{w.role}</dd>
            </div>
            <div>
              <dt className="text-muted">Year</dt>
              <dd className="mt-1.5 text-fg">{w.year}</dd>
            </div>
            {!!w.tags?.length && (
              <div>
                <dt className="text-muted">Stack</dt>
                <dd className="mt-1.5 flex flex-wrap gap-2">
                  {w.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </dd>
              </div>
            )}
          </dl>
          {(w.live || w.repo) && (
            <div className="reveal mt-8 flex flex-wrap gap-3">
              {w.live && (
                <Button href={w.live} target="_blank" rel="noopener noreferrer">
                  Visit live site <Arrow />
                </Button>
              )}
              {w.repo && (
                <Button href={w.repo} variant="ghost" target="_blank" rel="noopener noreferrer">
                  View code <Arrow />
                </Button>
              )}
            </div>
          )}
        </header>

        <Shot image={w.cover} priority aspect={w.coverAspect ?? "16/9"} className="reveal mt-12" sizes="(min-width: 1152px) 1100px, 100vw" />

        {/* The case study itself: free-form MDX from src/content/work/<track>/<slug>.mdx */}
        <div className="mt-16 mb-20 space-y-10">
          <w.Content />
        </div>

        {next && next !== w && (
          <Link
            href={`/${track}/work/${next.slug}`}
            className="card group mb-20 flex items-center justify-between gap-6 rounded-2xl p-7 transition-[translate] duration-300 hover:-translate-y-1 sm:p-10"
          >
            <div>
              <p className="font-mono text-xs text-muted">Next project</p>
              <p className="mt-2 text-2xl font-semibold tracking-tight sm:text-4xl">{next.title}</p>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:text-accent-ink">
              <Arrow />
            </span>
          </Link>
        )}
      </div>
    </article>
  );
}
