"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tracks } from "@/content/tracks";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const current = tracks.find((t) => pathname === `/${t.slug}` || pathname.startsWith(`/${t.slug}/`));
  const base = current ? `/${current.slug}` : "";
  // Visitors stay inside their branch: "home" is the branch page, and the base selector is never linked from here.
  const home = base || "/";

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href={home}
          aria-label="George Volski"
          onClick={(e) => {
            if (pathname === home) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="group flex items-center gap-2.5 font-medium tracking-tight">
          <Logo className="size-7 transition-transform duration-300 group-hover:scale-110" />
          <span className="hidden sm:inline">George Volski</span>
        </Link>

        <div className="flex items-center gap-5 text-sm">
          {current && (
            <>
              <Link href={`${base}#work`} className="hidden py-2 text-muted transition-colors hover:text-fg md:inline">
                Work
              </Link>
              <Link href={`${base}#about`} className="hidden py-2 text-muted transition-colors hover:text-fg md:inline">
                About
              </Link>
              <Link href={`${base}#contact`} className="hidden py-2 text-muted transition-colors hover:text-fg md:inline">
                Contact
              </Link>
            </>
          )}
          {/* Light mode is hidden for now. To bring it back: render <ThemeToggle /> here and restore the theme line in layout.tsx's boot script. */}
        </div>
      </div>
    </header>
  );
}
