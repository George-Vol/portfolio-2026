import { existsSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { alsoBuilt, site } from "@/content/site";
import type { Project } from "@/content/projects";
import type { Track } from "@/content/tracks";
import { CopyEmail } from "./CopyEmail";
import { Arrow, Button, Label, Section, Shot, Tag } from "./ui";

/** Faint blueprint grid with registration marks — the architecture hint. */
export function Blueprint() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)] bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[size:96px_96px] bg-center" />
      {/* crimson glow, carried over from the previous portfolio and cover image */}
      <div className="absolute top-[-25%] left-1/2 h-[620px] w-[min(1000px,140vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--hero-glow),transparent)] blur-2xl" />
    </div>
  );
}

function Corner({ className }: { className: string }) {
  return <span aria-hidden className={`absolute size-3 border-line-strong ${className}`} />;
}

export function Hero({ track }: { track: Track }) {
  // Checked at build time: the CV button appears once the branch's PDF exists in /public.
  const hasCv = existsSync(join(process.cwd(), "public", track.cv));
  return (
    <section className="relative isolate">
      <Blueprint />
      <div className="relative mx-auto max-w-6xl px-4 pt-20 pb-24 sm:px-6 sm:pt-32 sm:pb-36">
        <Corner className="top-8 left-4 border-t border-l sm:left-6" />
        <Corner className="top-8 right-4 border-t border-r sm:right-6" />
        <Label className="reveal">{track.label}</Label>
        {/* no reveal on the headline: it is the LCP element */}
        <h1 className="mt-6 max-w-4xl text-5xl leading-[0.95] font-semibold tracking-[-0.04em] text-balance sm:text-7xl lg:text-8xl">
          {track.headline}
        </h1>
        <p
          className="reveal mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
        >
          {track.subhead}
        </p>
        <div className="reveal mt-10 flex flex-wrap gap-3">
          <Button href="#work">
            View my work <Arrow className="rotate-135" />
          </Button>
          {hasCv && (
            <Button href={track.cv} variant="ghost" prefetch={false} download>
              Download CV
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

export function ProjectCard({ project, index, large }: { project: Project; index: number; large?: boolean }) {
  return (
    <Link
      href={`/${project.track}/work/${project.slug}`}
      className={`reveal card group block rounded-2xl p-3 transition-[translate] duration-300 hover:-translate-y-1 ${
        large ? "md:col-span-2" : ""
      }`}
    >
      <Shot
        image={project.cover}
        className={large ? "aspect-[16/9]" : "aspect-[16/10]"}
        sizes={large ? "(min-width: 1152px) 1100px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
      />
      <div className="flex items-start justify-between gap-6 px-2 pt-5 pb-2">
        <div>
          <p className="font-mono text-xs text-muted">{String(index + 1).padStart(2, "0")}</p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{project.title}</h3>
          <p className="mt-2 text-muted">{project.summary}</p>
          {project.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          )}
        </div>
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-all duration-300 group-hover:border-accent group-hover:text-accent-ink group-hover:rotate-45">
          <Arrow />
        </span>
      </div>
    </Link>
  );
}

export function Work({ projects, title }: { projects: Project[]; title: string }) {
  return (
    <Section id="work" index="01" label="Selected work" title={title}>
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} large={i === 0} />
        ))}
      </div>
    </Section>
  );
}

export function AlsoBuilt() {
  return (
    <Section index="02" label="Also built">
      <ul className="reveal border-t border-line">
        {alsoBuilt.map((item) => (
          <li
            key={item.title}
            className="group flex flex-col justify-between gap-1 border-b border-line py-5 transition-colors hover:bg-raised/40 sm:flex-row sm:items-center sm:px-3"
          >
            <span className="text-lg font-medium tracking-tight transition-transform duration-300 group-hover:translate-x-1">
              {item.title}
            </span>
            <span className="font-mono text-xs text-muted">{item.kind}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function About({ about, index }: { about: string; index: string }) {
  return (
    <Section id="about" index={index} label="About">
      <p className="reveal max-w-4xl text-2xl leading-snug font-medium tracking-tight text-balance sm:text-3xl">
        {about}
      </p>
    </Section>
  );
}

export function Skills({ track, index }: { track: Track; index: string }) {
  return (
    <Section index={index} label="Skills">
      <dl className="grid gap-8">
        {track.skills.map((row) => (
          <div key={row.label} className="reveal grid gap-3 sm:grid-cols-[200px_1fr] sm:items-baseline">
            <dt className="text-sm text-muted">{row.label}</dt>
            <dd className="flex flex-wrap gap-2">
              {row.items.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-line px-3.5 py-1.5 text-sm select-none transition-colors hover:border-accent hover:text-accent-ink"
                >
                  {s}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

export function Contact({ line, index }: { line: [string, string]; index: string }) {
  return (
    <Section id="contact" index={index} label="Contact">
      <div className="reveal card overflow-hidden rounded-3xl px-6 py-14 sm:px-14 sm:py-20">
        <h2 className="max-w-3xl text-4xl leading-[1.02] font-semibold tracking-[-0.03em] text-balance sm:text-6xl">
          {line[0]} <span className="text-muted">{line[1]}</span>
        </h2>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={`mailto:${site.email}`}>{site.email}</Button>
          <CopyEmail email={site.email} />
          <Button href={site.linkedin} variant="ghost" target="_blank" rel="noopener noreferrer">
            LinkedIn <Arrow />
          </Button>
        </div>
      </div>
    </Section>
  );
}
