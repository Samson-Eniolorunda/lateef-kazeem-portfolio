import { identity, navigation } from "@/lib/content";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="border-border bg-bg/90 sticky top-0 z-30 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-2 px-4 max-sm:justify-end md:px-8">
        <a
          href="#top"
          className="flex min-h-11 items-center text-sm font-semibold max-sm:sr-only"
        >
          {identity.name}
        </a>
        <nav aria-label="Primary" className="flex items-center gap-1">
          {navigation.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="text-muted hover:text-text flex min-h-11 items-center rounded-md px-2 text-sm sm:px-3"
            >
              {n.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
