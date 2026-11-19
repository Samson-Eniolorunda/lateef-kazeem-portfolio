import { achievements, experience } from "@/lib/content";
import { Section } from "@/components/ui/section";

export function Resume() {
  return (
    <Section id="resume" title="Resume">
      <h3 className="mb-4 text-xl font-semibold">Football Experience</h3>
      <ul className="divide-border border-border divide-y border-y">
        {experience.map((e) => (
          <li key={e.title} className="py-4">
            <p className="font-medium">{e.title}</p>
            <p className="text-muted mt-1">{e.text}</p>
          </li>
        ))}
      </ul>

      <h3 className="mt-16 mb-4 text-xl font-semibold">Achievements</h3>
      <ul className="divide-border border-border divide-y border-y">
        {achievements.map((a) => (
          <li key={a.highlight} className="py-4">
            {a.lead} <strong className="font-semibold">{a.highlight}</strong> {a.text}
          </li>
        ))}
      </ul>
    </Section>
  );
}
