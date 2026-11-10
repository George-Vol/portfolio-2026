import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { Image as Img } from "@/content/projects";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-line bg-raised/60 select-none px-2 py-1 font-mono text-xs tracking-wide text-muted">
      {children}
    </span>
  );
}

export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`font-mono text-xs tracking-[0.18em] text-accent-ink uppercase ${className}`}>{children}</p>;
}

const btn = {
  primary: "bg-fg text-bg hover:bg-accent hover:text-[#f5f5f4]",
  ghost: "border border-line bg-raised text-fg hover:border-line-strong hover:text-accent-ink",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof btn }) {
  return (
    <Link
      {...props}
      className={`inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${btn[variant]} ${className}`}
    />
  );
}

/** Section wrapper: thin top rule, mono label with index, consistent spacing. */
export function Section({
  id,
  index,
  label,
  title,
  children,
}: {
  id?: string;
  index: string;
  label: string;
  title?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="border-t border-line py-20 sm:py-28">
        <div className="reveal mb-10 flex items-baseline gap-4 sm:mb-14">
          <span className="font-mono text-xs text-muted">{index}</span>
          <Label>{label}</Label>
        </div>
        {title && (
          <h2 className="reveal mb-12 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}

/** Real image when `src` is set; otherwise a hatched placeholder that says what goes here. */
export function Shot({
  image,
  className = "",
  sizes = "(min-width: 1024px) 66vw, 100vw",
  priority,
}: {
  image: Img;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-xl border border-line bg-raised ${className}`}>
      {image.src ? (
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div
          role="img"
          aria-label={`Placeholder: ${image.alt}`}
          className="absolute inset-0 grid place-items-center bg-[repeating-linear-gradient(135deg,var(--line)_0_1px,transparent_1px_12px)]"
        >
          <span className="rounded-md border border-line bg-bg/80 px-3 py-1.5 font-mono text-[11px] text-muted">
            {image.alt} · placeholder
          </span>
        </div>
      )}
    </div>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={`size-4 ${className}`} aria-hidden>
      <path d="M4 12 12 4M6 4h6v6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
