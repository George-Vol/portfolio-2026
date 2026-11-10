"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(email);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          window.location.href = `mailto:${email}`; // clipboard blocked: fall back to opening mail
        }
      }}
      className="inline-flex border border-line bg-raised h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium text-fg transition-all duration-200 hover:-translate-y-0.5 hover:border-line-strong hover:text-accent-ink"
    >
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
