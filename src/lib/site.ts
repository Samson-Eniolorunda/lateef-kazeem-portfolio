type Env = Record<string, string | undefined>;

function withScheme(value: string): string {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

/**
 * Canonical origin. Order: NEXT_PUBLIC_SITE_URL (owner's domain, once chosen),
 * Vercel's production URL, Vercel's deployment URL, then localhost. `||` means an
 * empty variable is ignored.
 */
export function resolveSiteUrl(env: Env): string {
  const raw =
    env.NEXT_PUBLIC_SITE_URL?.trim() ||
    env.VERCEL_PROJECT_PRODUCTION_URL?.trim() ||
    env.VERCEL_URL?.trim() ||
    "";
  const url = raw ? withScheme(raw) : "http://localhost:3000";
  return url.replace(/\/+$/, "");
}

export const siteUrl = resolveSiteUrl({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  VERCEL_PROJECT_PRODUCTION_URL: process.env.VERCEL_PROJECT_PRODUCTION_URL,
  VERCEL_URL: process.env.VERCEL_URL,
});
