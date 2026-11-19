import Image from "next/image";
import { cv, identity, portrait } from "@/lib/content";
import { ButtonRow, LinkButton } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="top" className="pt-10 pb-8 md:pt-20 md:pb-16">
      <div className="mx-auto grid max-w-5xl items-center gap-8 px-4 md:grid-cols-[1fr_320px] md:gap-16 md:px-8">
        <div className="order-2 md:order-1">
          <p className="text-accent mb-3 text-sm font-medium">{identity.role}</p>
          <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            {identity.name}
          </h1>
          <p className="text-muted mt-3 text-lg">{identity.headline}</p>
          <div className="mt-8">
            <ButtonRow>
              <LinkButton href="#contact" variant="secondary">
                Contact
              </LinkButton>
              <LinkButton href={cv.href} download>
                {cv.label}
              </LinkButton>
            </ButtonRow>
          </div>
        </div>
        <div className="order-1 mx-auto w-full max-w-[280px] md:order-2 md:max-w-none">
          <Image
            src={portrait.src}
            width={portrait.width}
            height={portrait.height}
            alt={portrait.alt}
            priority
            sizes="(min-width: 768px) 320px, 280px"
            className="border-border aspect-[4/5] w-full rounded-md border object-cover"
          />
        </div>
      </div>
    </section>
  );
}
