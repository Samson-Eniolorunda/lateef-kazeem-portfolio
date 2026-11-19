# Rebuild status

## Phases and commits

1. Scaffold: 80240e5, ae701b5, a669630
2. Design system: 4d2fc4b
3. Content layer: 06e9e89
4. Sections: 4aa2884
5. Contact module and form: 1d8f573
6. SEO and security headers: 1fa8702
7. Images and performance: 3886185
8. Accessibility, e2e, screenshots; legacy site removed (still in git history): final commit

## Parity

21 of 21 items implemented (P-01 to P-21). P-16 (organisation logos) is shown but needs owner permission. P-21 (contact form) works but returns 503 until delivery env vars are set.

## Checks (all passing)

Prettier, ESLint (0 warnings), TypeScript strict, 16 unit tests, production build, 66 Playwright e2e tests (11 per viewport at 360, 390, 430, 768, 1280, 1536), including axe WCAG 2.2 AA in light and dark with zero violations, no sideways scroll, button order, filters, lightbox, contact form (mocked), SEO and header checks.

## Lighthouse (local production build, CLI)

Mobile: performance 96, accessibility 100, best practices 100, SEO 100 (LCP 2.7 s, CLS 0, TBT 120 ms). Desktop: 100 in all four.

## Verdict on phones

Reviewed 390 px screenshots in light and dark: single column, no overflow, 44 px buttons, secondary left and primary right on one row, readable type. Not tested on real devices; only emulated Chromium. The mobile LCP (2.7 s) is the hero photograph; a smaller or pre-cropped portrait would improve it.

## Review fixes

- Site address: `NEXT_PUBLIC_SITE_URL` (empty ignored, `https://` added, trailing slash removed), then `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL`, then localhost.
- Button rows: one button on the right; two or more split to the left and right edges on every width (asserted in e2e).
- Permanent redirects from the old static addresses (`/assets/cv/...`, `/assets/img/...`, `/index.html`).
- Contact form: the server checks the `CONTACT_*` variables when the page is built and the form shows a notice and is disabled when they are missing. Changing the variables therefore needs a new deployment. The API still returns 503 with clear wording.
- Contact limiter: expired entries are removed, only valid submissions count, and requests with no client address share a larger allowance. **Before the `CONTACT_*` variables are set, add a Vercel Firewall rate-limit rule for `POST /api/contact` or move the limiter to a shared store; the in-memory limiter is per server instance and best effort only.**
- Names are stripped of control characters (including CR and LF) before use in the e-mail subject.
- The footer year is corrected in the browser.
- Preview deployments allow the Vercel toolbar hosts in the content security policy; production is unchanged. HSTS keeps `max-age` only (no `preload` or `includeSubDomains` until a domain is chosen).
- `engines.node` set to 24.x; highlight alt text no longer uses the scoreboard abbreviation; birthplace in structured data matches the page ("Lagos State").

## Needed from the owner

- Contact email address and delivery provider with its env values (names in `.env.example`).
- Production domain (`NEXT_PUBLIC_SITE_URL`) for canonical, sitemap and Open Graph.
- Permission to show FIFA, CAF, NFF and NLO logos.
- Confirmation that 33/22/15 are all-time and that Victory FC dates are consistent.
- Social links, if any; a better video thumbnail; alt-text descriptions of the match photos.
- Confirmation the CV PDF is current.
- Vercel deployment and merge are left to the owner.

DONE
