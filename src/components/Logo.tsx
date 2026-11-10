// The "Plan G" mark: a squared G like a floor plan, the red dot marks the entry point. Favicon twin: src/app/icon.svg
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="36 36 184 184" aria-hidden className={className}>
      <path
        d="M199 78V74Q199 57 182 57H84Q57 57 57 84V172Q57 199 84 199H172Q199 199 199 172V134H150"
        fill="none"
        stroke="currentColor"
        strokeWidth="34"
        strokeLinejoin="round"
      />
      <circle cx="120" cy="134" r="17" className="fill-accent-ink" />
    </svg>
  );
}
