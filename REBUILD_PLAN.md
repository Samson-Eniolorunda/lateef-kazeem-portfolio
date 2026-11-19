# Rebuild plan: Lateef Kazeem portfolio

Branch: `rebuild/production`. Default branch `main` is never touched.

## 1. Audit of the current site

- Stack: static single `index.html` (23 KB), jQuery 2.1.3, Magnific Popup, Perfect Scrollbar, Modernizr, Bootstrap grid, custom `main.css` (36 KB), `animating.js` (page-transition engine), Material Symbols and Poppins loaded from Google Fonts. Template origin: "lmpixels" resume theme.
- Structure: single-page, four "sections" shown one at a time (Home, About Me, Resume, Portfolio), sidebar header on desktop, hamburger menu on mobile, arrow navigation, preloader, animated background image (`main_bg.png`, 2560x1600).
- Defects found: invalid Google Fonts URL (`Bebas+-of-Bebas+Neue`), no Open Graph or Twitter metadata, no canonical URL, no sitemap or robots, no structured data, no `lang`-correct British locale (`en`), hash-only navigation (nothing indexable per section), non-semantic controls (`div role=button` menu toggle, empty `<a>` lightbox overlays), icon font blocks render, jQuery and four plugins shipped for simple behaviour, unoptimised JPEGs (up to 409 KB, 1280 px), stale copyright year default (2025), `author` meta names the developer, no contact route of any kind, no security headers, no video fallback if YouTube blocked, 2560 px PNG background, three federation logos used without stated permission (needs owner).
- Not measured (no live URL available in this environment): Lighthouse of the old site.

## 2. Content inventory (to be kept verbatim)

Identity: Lateef Kazeem; Footballer; Centre Forward & Attacking Midfielder.
Meta description: "Lateef Kazeem, Nigerian centre forward (b. 2007). Strong aerial presence, clinical finishing and creative link-up play. 33 competitive matches, 22 goals and 15 assists."
Title: "Lateef Kazeem | Centre Forward | Player Profile & Highlights".

About paragraph: "I am a dedicated and highly coachable forward with a strong physical presence, good movement off the ball and a calm mentality in front of goal. I am comfortable playing as a centre forward, attacking midfielder or wide forward, using my height, timing and technique to link play and create chances for the team. I work hard out of possession, press intelligently and read the game well, with a genuine desire to keep improving and compete at higher levels of football."

Profile facts: Date of Birth 08 February 2007; Nationality Nigeria; Place of Birth Lagos State; Height 1.95 m; Weight 70 kg; Current Club Victory Football Club (2024 – Present); Primary Position Centre Forward (CF); Secondary Positions Attacking Midfielder, Left / Right Winger; Dominant Foot Comfortable with both feet.

Core competencies (6): strong aerial ability and hold-up play; confident 1v1 dribbling and close control; clinical finishing with both feet and head; creative link-up play and vision in the final third; disciplined defensive work rate and pressing; mature attitude, coachability and team-first mentality.

Stats: Competitive Matches 33; Goals Scored 22; Assists 15.

Scout note: "Open to trial opportunities, academy pathways and professional development programmes in Nigeria and abroad. Full match footage and additional data available on request."

Football experience (4): NLO 2023/2024 (forward for Victory FC, regular starter); Obasa Games 2024 (represented Victory FC, Lagos tournament); Lagos State FA Cup 2024 (centre forward vs strong regional opposition); NLO 2024/2025 (key attacking player, goals and assists).

Achievements (3): 6 goals in 9 matches NLO 2023/2024; second highest scorer, 4 goals in 7 matches, Obasa Games 2024; 12 goals in 17 matches NLO 2024/2025.

Portfolio: 4 photographs (`Lateef Kazeem 2-5.jpg`), 1 YouTube video (id `rjg0Gb7vKhE`, thumbnail currently photo 1), filters All / Player Images / YouTube Videos, lightbox.
Other: portrait (`Lateef Kazeem 1.jpg`), CV download (`Lateef-Kazeem-CV.pdf`), logos FIFA, CAF, NFF, NLO, favicon, copyright line.

## 3. Target stack

Next.js (App Router), React, TypeScript strict, Tailwind CSS, `next/image`, `next/font` (self-hosted), Vitest + Testing Library, Playwright, ESLint (0 warnings), Prettier. Deployed on Vercel by the owner (not by this routine). Contact form via Route Handler behind one module `src/lib/contact/send.ts`; env var names only in `.env.example`.

## 4. Parity checklist (tick when verified)

P-01 Name and role headline
P-02 Meta description and title text
P-03 About paragraph
P-04 Nine profile facts
P-05 Six core competencies
P-06 Three stats
P-07 Scout note
P-08 Four experience entries
P-09 Three achievements
P-10 Four photographs, optimised, with alt text
P-11 Photo lightbox (accessible, keyboard)
P-12 YouTube video (privacy-enhanced, click to load)
P-13 Portfolio filters
P-14 Portrait
P-15 CV download
P-16 Four organisation logos (needs owner: permission)
P-17 Favicon
P-18 Copyright line (year computed)
P-19 Section navigation (desktop and phone)
P-20 Light and dark themes (new)
P-21 Contact form (new)

## 5. Phases

1. [DONE] Scaffold: Next.js, TS strict, Tailwind, lint, format, tests, CI-free scripts; move assets; commit.
2. [DONE] Design system: tokens, type scale, spacing, light/dark, button and layout primitives.
3. [DONE] Content layer: typed data file holding every item in section 2; unit tests asserting counts.
4. [DONE] Sections: header/nav, hero, about, stats, experience, achievements, portfolio with lightbox and filters.
5. [DONE] Contact module and form, validation, honeypot, rate limit hook, tests.
6. [DONE] SEO: metadata, Open Graph image, sitemap, robots, JSON-LD (Person, athlete), security headers.
7. Images and performance: resized AVIF/WebP, fonts, Lighthouse mobile.
8. Accessibility and e2e: Playwright at 360, 390, 430, 768, 1280, 1536; axe; screenshots light and dark.
9. Final: REBUILD_STATUS.md, parity count, verdict.

## 6. Needs owner

- Contact email address, and form delivery provider choice and its env values.
- Production domain (for canonical URL, sitemap, Open Graph).
- Permission to show FIFA, CAF, NFF and NLO logos.
- Confirmation that stats (33/22/15) reconcile with the achievements (6+4+12 = 22 goals; matches 9+7+17 = 33) and whether stats are all-time.
- Whether Victory FC (2024 – Present) and "Victory FC" in NLO 2023/2024 are consistent; whether social links exist.
- Better video thumbnail; alt-text descriptions for the match photos.
- Whether the CV PDF is current.

## Progress log

- Phase 1 done: Next.js 16, React 19, Tailwind 4, TS strict; format, lint (0 warnings), typecheck, unit, build and e2e (6 viewports) pass. Run e2e with `PW_CHROMIUM=/opt/pw-browsers/chromium npm run e2e`. Legacy site kept under `legacy/` for parity reference; delete in final phase.
- Phase 2 done: tokens (light, dark, one green accent), Geist font (self-hosted package), 4px spacing, type scale, Button, LinkButton, ButtonRow (secondary left, primary right), Section. Gates pass.
- Phase 3 done: `src/lib/content.ts` holds all content verbatim; tests assert counts and that achievements sum to the stats (22 goals, 33 matches).
- Phase 4 done: header with theme toggle, hero, about, stats, resume, portfolio (filters, native dialog lightbox, privacy-enhanced YouTube), footer. e2e: no sideways scroll, button order, filters, lightbox at six sizes. Note: full-page screenshots show lazy photos blank (capture artefact; images verified loading).
- Phase 5 done: `src/lib/contact/` (validate, rate-limit, send, handle), `/api/contact` route, form with honeypot and accessible errors, `.env.example` (names only), 9 unit tests, e2e with mocked API. Without env vars the API returns 503 (never calls a real service). Gates pass (36 e2e).
- Phase 6 done: metadata, canonical, Open Graph and Twitter, generated OG image, sitemap, robots, Person JSON-LD, security headers incl. CSP. `NEXT_PUBLIC_SITE_URL` (needs owner: domain) sets the origin. Gates pass (42 e2e, 16 unit).
- Next: Phase 7 (images and performance, Lighthouse mobile).
