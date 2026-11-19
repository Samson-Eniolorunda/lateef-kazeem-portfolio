import { describe, expect, it } from "vitest";
import { resolveSiteUrl } from "./site";

describe("resolveSiteUrl", () => {
  it("prefers NEXT_PUBLIC_SITE_URL", () => {
    expect(
      resolveSiteUrl({
        NEXT_PUBLIC_SITE_URL: "https://example.com",
        VERCEL_PROJECT_PRODUCTION_URL: "prod.vercel.app",
        VERCEL_URL: "dep.vercel.app",
      }),
    ).toBe("https://example.com");
  });
  it("adds https when no scheme is given", () => {
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "example.com" })).toBe(
      "https://example.com",
    );
  });
  it("keeps an explicit http scheme", () => {
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "http://example.com" })).toBe(
      "http://example.com",
    );
  });
  it("strips trailing slashes", () => {
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://example.com//" })).toBe(
      "https://example.com",
    );
  });
  it("ignores an empty value and uses the Vercel production URL", () => {
    expect(
      resolveSiteUrl({
        NEXT_PUBLIC_SITE_URL: "",
        VERCEL_PROJECT_PRODUCTION_URL: "prod.vercel.app",
        VERCEL_URL: "dep.vercel.app",
      }),
    ).toBe("https://prod.vercel.app");
  });
  it("falls back to the deployment URL", () => {
    expect(resolveSiteUrl({ VERCEL_URL: "dep.vercel.app" })).toBe(
      "https://dep.vercel.app",
    );
  });
  it("falls back to localhost", () => {
    expect(resolveSiteUrl({})).toBe("http://localhost:3000");
    expect(resolveSiteUrl({ NEXT_PUBLIC_SITE_URL: "  " })).toBe("http://localhost:3000");
  });
});
