import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="flex flex-col justify-between gap-3 border-t border-line py-8 font-mono text-xs text-muted sm:flex-row">
        <p>© {site.name}</p>
        <div className="flex gap-5">
          <a href={`mailto:${site.email}`} className="-my-1.5 py-1.5 transition-colors hover:text-accent-ink">
            Email
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="-my-1.5 py-1.5 transition-colors hover:text-accent-ink">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
