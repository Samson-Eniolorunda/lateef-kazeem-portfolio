import { beforeEach, describe, expect, it, vi } from "vitest";
import { handleContact } from "./handle";
import { resetRateLimit } from "./rate-limit";
import { sendContact } from "./send";
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
  it("handles non-objects", () => {
    expect(validateContact(null).ok).toBe(false);
  });
});

describe("sendContact", () => {
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
  it("rate limits", async () => {
    const send = async () => ({ ok: true }) as const;
    for (let i = 0; i < 5; i++) await handleContact(good, "9", send);
    expect((await handleContact(good, "9", send)).status).toBe(429);
  });
});
