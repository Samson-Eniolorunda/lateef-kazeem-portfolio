"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { media, type MediaItem } from "@/lib/content";
import { Section } from "@/components/ui/section";

const filters = [
  { id: "all", label: "All" },
  { id: "image", label: "Player Images" },
  { id: "video", label: "YouTube Videos" },
] as const;
type Filter = (typeof filters)[number]["id"];

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<MediaItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const items = media.filter((m) => filter === "all" || m.kind === filter);

  function open(item: MediaItem, el: HTMLElement) {
    opener.current = el;
    setActive(item);
    dialog.current?.showModal();
  }

  function close() {
    dialog.current?.close();
  }

  return (
    <Section id="portfolio" title="Portfolio">
      <div
        role="group"
        aria-label="Filter portfolio"
        className="mb-6 flex flex-wrap gap-2"
      >
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`min-h-11 rounded-md border px-4 text-sm transition-colors ${
              filter === f.id
                ? "border-accent bg-accent text-accent-contrast"
                : "border-border bg-surface hover:bg-surface-2"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {items.map((m) => (
          <li key={m.id}>
            <button
              type="button"
              onClick={(e) => open(m, e.currentTarget)}
              aria-label={m.kind === "video" ? "Play YouTube video" : `Open ${m.alt}`}
              className="group border-border relative block w-full overflow-hidden rounded-md border"
            >
              <Image
                src={m.src}
                width={m.width}
                height={m.height}
                alt={m.alt}
                loading="lazy"
                sizes="(min-width: 768px) 320px, 50vw"
                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <span className="bg-bg absolute top-2 left-2 rounded-sm px-2 py-1 text-xs font-medium">
                {m.kind === "video" ? "Video" : "Image"}
              </span>
              {m.kind === "video" && (
                <span
                  className="absolute inset-0 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="bg-accent text-accent-contrast flex size-14 items-center justify-center rounded-full">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </span>
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={active?.alt ?? "Media viewer"}
        onClose={() => {
          setActive(null);
          opener.current?.focus();
        }}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="border-border bg-surface text-text m-auto max-h-[92dvh] w-[min(92vw,960px)] rounded-md border p-3 backdrop:bg-black/70"
      >
        {active && (
          <div>
            {active.kind === "video" && active.youtubeId ? (
              <iframe
                title="Lateef Kazeem highlights on YouTube"
                src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=1`}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="aspect-video w-full rounded-sm"
              />
            ) : (
              <Image
                src={active.src}
                width={active.width}
                height={active.height}
                alt={active.alt}
                sizes="92vw"
                className="mx-auto max-h-[78dvh] w-auto rounded-sm object-contain"
              />
            )}
            <div className="mt-3 flex justify-end">
              <button
                type="button"
                onClick={close}
                autoFocus
                className="border-border bg-surface hover:bg-surface-2 inline-flex min-h-11 items-center rounded-md border px-5 text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </dialog>
    </Section>
  );
}
