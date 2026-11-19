import { allow } from "./rate-limit";
import { sendContact } from "./send";
import { validateContact } from "./validate";

export type ApiBody =
  { ok: true } | { ok: false; error: string; errors?: Record<string, string> };

/** Pure request handler so it can be tested without a server. */
export async function handleContact(
  raw: unknown,
  ip: string | null,
  send: typeof sendContact = sendContact,
): Promise<{ status: number; body: ApiBody }> {
  const v = validateContact(raw);
  if (!v.ok) {
    return {
      status: 400,
      body: { ok: false, error: "Check the highlighted fields.", errors: v.errors },
    };
  }
  if (v.spam) return { status: 200, body: { ok: true } }; // silently drop bots
  // Only valid submissions count towards the limit. Requests with no client address
  // share one bucket with a higher limit, so they cannot easily block real visitors.
  if (!allow(ip ?? "unknown", ip ? 5 : 30)) {
    return {
      status: 429,
      body: { ok: false, error: "Too many requests. Please try again later." },
    };
  }
  const r = await send(v.value);
  if (r.ok) return { status: 200, body: { ok: true } };
  return r.reason === "not_configured"
    ? {
        status: 503,
        body: {
          ok: false,
          error: "The contact form is not yet available. Please return later.",
        },
      }
    : {
        status: 502,
        body: { ok: false, error: "Message could not be sent. Please try again." },
      };
}
