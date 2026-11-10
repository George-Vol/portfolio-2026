import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blueprint } from "@/components/sections";
import { Arrow, Label, Shot, Tag } from "@/components/ui";
import { projects, projectsFor } from "@/content/projects";
import { getTrack } from "@/content/tracks";

// Every param is prerendered at build, so navigation is already instant; skip the dev-only Suspense check.
export const instant = false;
export const generateStaticParams = () => projects.map((p) => ({ track: p.track, slug: p.slug }));

const find = (track: string, slug: string) => projects.find((p) => p.track === track && p.slug === slug);

export async function generateMetadata({ params }: PageProps<"/[track]/work/[slug]">): Promise<Metadata> {
  const { track, slug } = await params;
  const p = find(track, slug);
  if (!p) return {};
  const url = `/${track}/work/${slug}`;
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: url },
    ...(p.draft && { robots: { index: false } }),
    // shortcut: case studies reuse their track's OG image; add per-project images when real screenshots exist
    openGraph: { title: p.title, description: p.summary, url, images: getTrack(track)?.ogImage },
  };
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="reveal grid gap-4 border-t border-line py-14 md:grid-cols-[220px_1fr] md:gap-10">
      <Label className="pt-1">{label}</Label>
      <div>{children}</div>
    </section>
  );
}

export default async function CaseStudy({ params }: PageProps<"/[track]/work/[slug]">) {
  const { track, slug } = await params;
  const p = find(track, slug);
  if (!p) notFound();

  const labels = getTrack(track)!.caseLabels;
  const list = projectsFor(track);
  const next = list[(list.indexOf(p) + 1) % list.length];

  return (
    <article className="relative isolate">
      <Blueprint />
      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6 sm:pt-16">
        <Link href={`/${track}#work`} className="-my-2 inline-flex items-center gap-2 py-2 font-mono text-xs text-muted transition-colors hover:text-accent-ink">
          <Arrow className="-rotate-135" /> All work
        </Link>

        <header className="mt-10 sm:mt-14">
          <h1 className="max-w-4xl text-4xl leading-[1] font-semibold tracking-[-0.04em] text-balance sm:text-7xl">
            {p.title}
          </h1>
          <dl className="reveal mt-10 grid gap-6 border-t border-line pt-6 font-mono text-xs sm:grid-cols-3">
            <div>
              <dt className="text-muted">Role</dt>
              <dd className="mt-1.5 text-fg">{p.role}</dd>
            </div>
            <div>
              <dt className="text-muted">Year</dt>
              <dd className="mt-1.5 text-fg">{p.year}</dd>
            </div>
            {p.tags.length > 0 && (
              <div>
                <dt className="text-muted">Stack</dt>
                <dd className="mt-1.5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </header>

        <Shot image={p.cover} priority className="reveal mt-12 aspect-[16/9]" sizes="(min-width: 1152px) 1100px, 100vw" />

        <div className="mt-16">
          <Block label={labels.problem}>
            <p className="max-w-2xl text-xl leading-relaxed">{p.problem}</p>
          </Block>
          <Block label={labels.built}>
            <ul className="max-w-2xl space-y-3">
              {p.built.map((b) => (
                <li key={b} className="flex gap-3 text-lg">
                  <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </Block>
          <Block label={labels.decisions}>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">{p.design.text}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {p.design.images.map((img) => (
                <Shot key={img.alt} image={img} className="aspect-[4/3]" sizes="(min-width: 640px) 40vw, 100vw" />
              ))}
            </div>
          </Block>
          <Block label={labels.result}>
            <p className="max-w-2xl text-xl leading-relaxed">{p.result}</p>
          </Block>
        </div>

        <section aria-label="Screenshots" className="grid gap-4 border-t border-line py-14 sm:grid-cols-2">
          {p.gallery.map((img, i) => (
            <Shot
              key={img.alt}
              image={img}
              className={`reveal aspect-[16/10] ${i === 0 ? "sm:col-span-2 sm:aspect-[16/8]" : ""}`}
              sizes={i === 0 ? "(min-width: 1152px) 1100px, 100vw" : "(min-width: 640px) 50vw, 100vw"}
            />
          ))}
        </section>

        {next && next !== p && (
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
