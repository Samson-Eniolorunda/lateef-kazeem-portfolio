import Image from "next/image";
import { identity, organisations } from "@/lib/content";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-border border-t py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 md:px-8">
        <ul className="flex flex-wrap items-center gap-6" aria-label="Organisations">
          {organisations.map((o) => (
            <li key={o.name}>
              <Image
                src={o.src}
                width={o.width}
                height={o.height}
                alt={o.name}
                className="h-10 w-auto object-contain"
              />
            </li>
          ))}
        </ul>
        <p className="text-muted text-sm">
          © {year} {identity.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
