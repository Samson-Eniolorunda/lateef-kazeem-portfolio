/** Canonical origin. Set NEXT_PUBLIC_SITE_URL in Vercel (needs owner: production domain). */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");
