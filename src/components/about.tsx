import { about, competencies, profile, scoutNote, stats } from "@/lib/content";
import { Section } from "@/components/ui/section";

export function About() {
  return (
    <Section id="about" title="About">
      <div className="grid gap-10 md:grid-cols-[3fr_2fr] md:gap-16">
        <p className="text-text max-w-prose text-base">{about}</p>
        <dl className="divide-border border-border divide-y border-y">
          {profile.map((p) => (
            <div key={p.label} className="grid grid-cols-[120px_1fr] gap-4 py-3 text-sm">
              <dt className="text-muted">{p.label}</dt>
              <dd>{p.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <h3 className="mt-16 mb-4 text-xl font-semibold">Core Competencies</h3>
      <ul className="grid gap-3 sm:grid-cols-2">
        {competencies.map((c) => (
          <li
            key={c}
            className="border-border bg-surface rounded-md border px-4 py-3 text-sm"
          >
            {c}
          </li>
        ))}
      </ul>

      <h3 className="mt-16 mb-4 text-xl font-semibold">Player Stats</h3>
      <dl className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="border-border bg-surface rounded-md border p-4 md:p-6"
          >
            <dd className="text-2xl font-semibold tabular-nums md:text-3xl">{s.value}</dd>
            <dt className="text-muted mt-1 text-xs md:text-sm">{s.label}</dt>
          </div>
        ))}
      </dl>

      <p className="border-accent text-muted mt-12 max-w-prose border-l-2 pl-4">
        {scoutNote}
      </p>
    </Section>
  );
}
