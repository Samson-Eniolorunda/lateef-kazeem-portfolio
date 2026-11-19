import { identity, portrait } from "@/lib/content";
import { siteUrl } from "@/lib/site";

/** schema.org Person only; contains no invented facts (all values come from content.ts). */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.name,
    jobTitle: `${identity.role}, ${identity.headline}`,
    description: identity.description,
    url: siteUrl,
    image: `${siteUrl}${portrait.src}`,
    birthDate: "2007-02-08",
    nationality: { "@type": "Country", name: "Nigeria" },
    birthPlace: { "@type": "Place", name: "Lagos State" },
    height: { "@type": "QuantitativeValue", value: 1.95, unitCode: "MTR" },
    weight: { "@type": "QuantitativeValue", value: 70, unitCode: "KGM" },
  };
}
