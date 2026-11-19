import { beforeEach, describe, expect, it, vi } from "vitest";
import { handleContact } from "./handle";
import { allow, rateLimitSize, resetRateLimit } from "./rate-limit";
import { isContactConfigured, sendContact } from "./send";
import { validateContact } from "./validate";

const good = {
  name: "Ada Obi",
  email: "ada@example.com",
  message: "Interested in a trial.",
  website: "",
};

beforeEach(() => resetRateLimit());

describe("validateContact", () => {
  it("accepts a good message", () => {
    expect(validateContact(good).ok).toBe(true);
  });
  it("rejects bad fields", () => {
    const r = validateContact({ name: "", email: "x", message: "hi" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(Object.keys(r.errors)).toEqual(["name", "email", "message"]);
  });
  it("flags honeypot", () => {
    const r = validateContact({ ...good, website: "http://spam" });
    expect(r.ok && r.spam).toBe(true);
  });
  it("strips control characters, including CR and LF, from the name", () => {
    const r = validateContact({
      ...good,
      name: "Ada\r\nBcc: victim@example.com\u0000\u2028Obi",
    });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.name).toBe("Ada Bcc: victim@example.com Obi");
  });
  it("handles non-objects", () => {
    expect(validateContact(null).ok).toBe(false);
  });
});

describe("isContactConfigured", () => {
  it("needs all three variables", () => {
    const env = {
      CONTACT_PROVIDER_API_KEY: "k",
      CONTACT_TO_EMAIL: "a@b.c",
      CONTACT_FROM_EMAIL: "d@e.f",
    };
    expect(isContactConfigured(env)).toBe(true);
    expect(isContactConfigured({ ...env, CONTACT_TO_EMAIL: "" })).toBe(false);
    expect(isContactConfigured({})).toBe(false);
  });
});

describe("sendContact", () => {
  it("keeps line breaks out of the subject", async () => {
    const f = vi.fn().mockResolvedValue({ ok: true });
    const env = {
      CONTACT_PROVIDER_API_KEY: "k",
      CONTACT_TO_EMAIL: "a@b.c",
      CONTACT_FROM_EMAIL: "d@e.f",
    };
    const v = validateContact({ ...good, name: "Ada\r\nBcc: x@y.z" });
    if (!v.ok) throw new Error("expected valid");
    await sendContact(v.value, env, f as unknown as typeof fetch);
    const body = JSON.parse((f.mock.calls[0]![1] as { body: string }).body) as {
      subject: string;
    };
    expect(body.subject).not.toMatch(/[\r\n]/);
  });
  it("reports not configured without env", async () => {
    expect(await sendContact(good, {})).toEqual({ ok: false, reason: "not_configured" });
  });
  it("posts when configured (mocked fetch)", async () => {
    const f = vi.fn().mockResolvedValue({ ok: true });
    const env = {
      CONTACT_PROVIDER_API_KEY: "k",
      CONTACT_TO_EMAIL: "a@b.c",
      CONTACT_FROM_EMAIL: "d@e.f",
    };
    expect(await sendContact(good, env, f as unknown as typeof fetch)).toEqual({
      ok: true,
    });
    expect(f).toHaveBeenCalledOnce();
  });
  it("reports failure", async () => {
    const f = vi.fn().mockRejectedValue(new Error("x"));
    const env = {
      CONTACT_PROVIDER_API_KEY: "k",
      CONTACT_TO_EMAIL: "a@b.c",
      CONTACT_FROM_EMAIL: "d@e.f",
    };
    expect(await sendContact(good, env, f as unknown as typeof fetch)).toEqual({
      ok: false,
      reason: "failed",
    });
  });
});

describe("handleContact", () => {
  it("400 on invalid", async () => {
    expect((await handleContact({}, "1")).status).toBe(400);
  });
  it("drops spam with 200 and no send", async () => {
    const send = vi.fn();
    const r = await handleContact({ ...good, website: "x" }, "1", send);
    expect(r.status).toBe(200);
    expect(send).not.toHaveBeenCalled();
  });
  it("503 when unconfigured, 200 when sent", async () => {
    expect(
      (
        await handleContact(good, "1", async () => ({
          ok: false,
          reason: "not_configured",
        }))
      ).status,
    ).toBe(503);
    expect((await handleContact(good, "1", async () => ({ ok: true }))).status).toBe(200);
  });
  it("does not count invalid submissions towards the limit", async () => {
    const send = async () => ({ ok: true }) as const;
    for (let i = 0; i < 10; i++) await handleContact({}, "7", send);
    expect((await handleContact(good, "7", send)).status).toBe(200);
  });
  it("gives header-less requests a larger shared allowance", async () => {
    const send = async () => ({ ok: true }) as const;
    for (let i = 0; i < 6; i++) {
      expect((await handleContact(good, null, send)).status).toBe(200);
    }
  });
  it("rate limits", async () => {
    const send = async () => ({ ok: true }) as const;
    for (let i = 0; i < 5; i++) await handleContact(good, "9", send);
    expect((await handleContact(good, "9", send)).status).toBe(429);
  });
});

describe("allow", () => {
  it("removes expired entries", () => {
    allow("a", 5, 1000, 0);
    allow("b", 5, 1000, 0);
    expect(rateLimitSize()).toBe(2);
    allow("c", 5, 1000, 5000);
    expect(rateLimitSize()).toBe(1);
  });
});
