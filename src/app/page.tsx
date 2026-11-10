import type { Metadata } from "next";
import Link from "next/link";
import { Blueprint } from "@/components/sections";
import { Arrow, Label, Tag } from "@/components/ui";
import { projectsFor } from "@/content/projects";
import { site } from "@/content/site";
import { tracks } from "@/content/tracks";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <section className="relative isolate">
      <Blueprint />
      <div className="mx-auto max-w-6xl px-4 pt-20 pb-24 sm:px-6 sm:pt-32">
        <Label className="reveal">{`// ${site.name}`}</Label>
        <h1 className="mt-6 max-w-4xl text-5xl leading-[0.95] font-semibold tracking-[-0.04em] text-balance sm:text-7xl">
          I build web and mobile products, and design them too.
        </h1>
        <p className="reveal mt-8 max-w-xl text-lg text-muted">Pick a side of my work to start.</p>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {tracks.map((t, i) => (
            <Link
              key={t.slug}
              href={`/${t.slug}`}
              className="reveal card group flex min-h-72 flex-col justify-between rounded-2xl p-7 transition-[translate] duration-300 hover:-translate-y-1 sm:p-9"
              style={{ "--delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-xs text-muted">/{t.slug}</span>
                <span className="grid size-11 place-items-center rounded-full border border-line text-muted transition-all duration-300 group-hover:rotate-45 group-hover:border-accent group-hover:text-accent-ink">
                  <Arrow />
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{t.name}</h2>
                <p className="mt-3 max-w-sm text-muted">{t.blurb}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {t.skills[0].items.slice(0, 4).map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                  <Tag>{projectsFor(t.slug).length} case studies</Tag>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
