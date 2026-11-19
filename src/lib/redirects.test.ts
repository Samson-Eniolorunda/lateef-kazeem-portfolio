import { describe, expect, it } from "vitest";
import { redirectRules } from "../../next.config";

describe("legacy redirects", () => {
  it("are permanent and cover the old static addresses", () => {
    expect(redirectRules.every((r) => r.permanent)).toBe(true);
    expect(redirectRules.map((r) => [r.source, r.destination])).toEqual([
      ["/assets/cv/Lateef-Kazeem-CV.pdf", "/cv/Lateef-Kazeem-CV.pdf"],
      ["/assets/img/:file*", "/img/:file*"],
      ["/index.html", "/"],
    ]);
  });
});
