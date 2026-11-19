const hits = new Map<string, number[]>();

/**
 * In-memory limiter per key. It is best effort only: each serverless instance has its
 * own map, so it does not stop a determined sender. Before the CONTACT_* variables are
 * set in production, add a Vercel Firewall rate-limit rule for POST /api/contact or
 * move this to a shared store (see REBUILD_STATUS.md).
 */
export function allow(
  key: string,
  limit = 5,
  windowMs = 10 * 60 * 1000,
  now = Date.now(),
) {
  // Drop expired entries so the map cannot grow without bound.
  for (const [k, times] of hits) {
    const live = times.filter((t) => now - t < windowMs);
    if (live.length === 0) hits.delete(k);
    else if (live.length !== times.length) hits.set(k, live);
  }
  const recent = hits.get(key) ?? [];
  if (recent.length >= limit) return false;
  recent.push(now);
  hits.set(key, recent);
  return true;
}

export function resetRateLimit() {
  hits.clear();
}

export function rateLimitSize() {
  return hits.size;
}
