import { allow } from "./rate-limit";
import { sendContact } from "./send";
import { validateContact } from "./validate";

export type ApiBody =
  { ok: true } | { ok: false; error: string; errors?: Record<string, string> };

/** Pure request handler so it can be tested without a server. */
export async function handleContact(
  raw: unknown,
  ip: string,
  send: typeof sendContact = sendContact,
): Promise<{ status: number; body: ApiBody }> {
  if (!allow(ip)) {
    return {
      status: 429,
      body: { ok: false, error: "Too many requests. Try again later." },
    };
  }
  const v = validateContact(raw);
  if (!v.ok) {
    return {
      status: 400,
      body: { ok: false, error: "Check the highlighted fields.", errors: v.errors },
    };
  }
  if (v.spam) return { status: 200, body: { ok: true } }; // silently drop bots
  const r = await send(v.value);
  if (r.ok) return { status: 200, body: { ok: true } };
  return r.reason === "not_configured"
    ? {
        status: 503,
        body: { ok: false, error: "The contact form is not available yet." },
      }
    : {
        status: 502,
        body: { ok: false, error: "Message could not be sent. Please try again." },
      };
}
