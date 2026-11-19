import type { ContactInput } from "./validate";

export type SendResult =
  { ok: true } | { ok: false; reason: "not_configured" | "failed" };

type Env = Record<string, string | undefined>;

/** True when all delivery variables are set; also used to tell the form whether it can work. */
export function isContactConfigured(env: Env = process.env): boolean {
  return Boolean(
    env.CONTACT_PROVIDER_API_KEY && env.CONTACT_TO_EMAIL && env.CONTACT_FROM_EMAIL,
  );
}

/**
 * The single delivery module. Today it posts to an email API (Resend-compatible
 * JSON). To change provider, change only this file.
 * Env var names: CONTACT_PROVIDER_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL.
 */
export async function sendContact(
  input: ContactInput,
  env: Env = process.env,
  fetchImpl: typeof fetch = fetch,
): Promise<SendResult> {
  if (!isContactConfigured(env)) return { ok: false, reason: "not_configured" };
  const key = env.CONTACT_PROVIDER_API_KEY;
  const to = env.CONTACT_TO_EMAIL;
  const from = env.CONTACT_FROM_EMAIL;
  try {
    const res = await fetchImpl("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: input.email,
        subject: `Portfolio enquiry from ${input.name}`,
        text: `${input.message}\n\nFrom: ${input.name} <${input.email}>`,
      }),
    });
    return res.ok ? { ok: true } : { ok: false, reason: "failed" };
  } catch {
    return { ok: false, reason: "failed" };
  }
}
