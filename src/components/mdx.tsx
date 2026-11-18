// Building blocks for case-study MDX files. Every component here is available in any .mdx file without importing.
// Plain Markdown (headings, paragraphs, lists, links, quotes, images) is styled to match the site too.
// Reference with examples: src/content/work/_template.mdx

import type { MDXComponents } from "mdx/types";
import type { ComponentProps, ReactNode } from "react";
import { Label, Shot } from "./ui";

/** A labelled block: label on the left, content on the right (stacked on phones). */
function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="reveal grid gap-4 border-t border-line py-14 md:grid-cols-[220px_1fr] md:gap-10">
      <Label className="pt-1">{label}</Label>
      <div className="min-w-0 space-y-5">{children}</div>
    </section>
  );
}

/** One image. `aspect` is any ratio ("16/9", "4/3", "1/1", "9/16"); `fit="contain"` shows the whole image. */
function Img({
  src,
  alt,
  aspect = "16/10",
  fit = "cover",
  caption,
  priority,
}: {
  src: string;
  alt: string;
  aspect?: string;
  fit?: "cover" | "contain";
  caption?: string;
  priority?: boolean;
}) {
  return (
    <figure className="reveal min-w-0">
      <Shot image={{ src, alt }} aspect={aspect} fit={fit} priority={priority} sizes="(min-width: 1152px) 1100px, 100vw" />
      {caption && <figcaption className="mt-3 font-mono text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}

const cols = { 1: "", 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "grid-cols-2 lg:grid-cols-4" };

/** Lay any blocks out side by side: 1–4 columns, stacking on phones. */
function Grid({ cols: n = 2, children }: { cols?: 1 | 2 | 3 | 4; children: ReactNode }) {
  return <div className={`grid items-start gap-4 ${cols[n]}`}>{children}</div>;
}

/** A mobile screenshot in a phone frame. Put several in a <Grid cols={3}> or <Grid cols={4}>. */
function Phone({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="reveal mx-auto w-full max-w-[280px]">
      <Shot
        image={{ src, alt }}
        aspect="9/19.5"
        className="rounded-[2rem] border-[6px] border-elev [&_img]:object-top"
        sizes="280px"
      />
      {caption && <figcaption className="mt-3 text-center font-mono text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}

/** A video file from /public. Never autoplays. */
function Video({ src, poster, caption, aspect = "16/9" }: { src: string; poster?: string; caption?: string; aspect?: string }) {
  return (
    <figure className="reveal">
      <video
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        className="w-full rounded-xl border border-line bg-raised"
        style={{ aspectRatio: aspect }}
      />
      {caption && <figcaption className="mt-3 font-mono text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}

/** Embed a page in a frame: a Figma prototype (figma.com → Share → Embed), YouTube, a live demo… */
function Embed({ src, title, aspect = "16/9", caption }: { src: string; title: string; aspect?: string; caption?: string }) {
  return (
    <figure className="reveal">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allowFullScreen
        className="w-full rounded-xl border border-line bg-raised"
        style={{ aspectRatio: aspect }}
      />
      {caption && <figcaption className="mt-3 font-mono text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}

/** A highlighted box for a key point, a quote from the brief, or a result. */
function Callout({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <aside className="reveal card space-y-3 rounded-2xl p-6 sm:p-8">
      {label && <Label>{label}</Label>}
      <div className="space-y-3 text-lg leading-relaxed">{children}</div>
    </aside>
  );
}

export const mdxComponents: MDXComponents = {
  Section,
  Img,
  Grid,
  Phone,
  Video,
  Embed,
  Callout,
  // plain Markdown, styled to match the site
  h2: (p) => <h2 className="reveal max-w-3xl pt-6 text-3xl font-semibold tracking-tight text-balance sm:text-4xl" {...p} />,
  h3: (p) => <h3 className="max-w-3xl pt-2 text-xl font-semibold tracking-tight" {...p} />,
  p: (p) => <p className="max-w-2xl text-lg leading-relaxed text-fg/90" {...p} />,
  ul: (p) => <ul className="max-w-2xl space-y-3 text-lg" {...p} />,
  ol: (p) => <ol className="max-w-2xl list-decimal space-y-3 pl-5 text-lg marker:text-muted" {...p} />,
  li: ({ children, ...p }) => (
    <li className="flex gap-3 [ol>&]:list-item" {...p}>
      <span aria-hidden className="mt-3.5 h-px w-4 shrink-0 bg-accent [ol>li>&]:hidden" />
      <span>{children}</span>
    </li>
  ),
  a: (p) => (
    <a
      className="text-accent-ink underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent-ink"
      {...(p.href?.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
      {...p}
    />
  ),
  blockquote: (p) => <blockquote className="max-w-2xl border-l-2 border-accent pl-5 text-xl leading-relaxed text-fg" {...p} />,
  hr: () => <hr className="border-line" />,
  strong: (p) => <strong className="font-semibold text-fg" {...p} />,
  code: (p) => <code className="rounded bg-raised px-1.5 py-0.5 font-mono text-[0.9em]" {...p} />,
  // Markdown images ![alt](src): natural aspect ratio, full width
  img: ({ src, alt }: ComponentProps<"img">) =>
    typeof src === "string" && src ? (
      // eslint-disable-next-line @next/next/no-img-element -- Markdown images have no known size; use <Img> for optimised ones
      <img src={src} alt={alt ?? ""} loading="lazy" className="w-full rounded-xl border border-line" />
    ) : null,
};
