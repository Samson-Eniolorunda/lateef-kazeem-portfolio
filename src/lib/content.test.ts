import { describe, expect, it } from "vitest";
import * as c from "@/lib/content";

describe("content parity with the original site", () => {
  it("keeps every item", () => {
    expect(c.profile).toHaveLength(9);
    expect(c.competencies).toHaveLength(6);
    expect(c.stats.map((s) => s.value)).toEqual([33, 22, 15]);
    expect(c.experience).toHaveLength(4);
    expect(c.achievements).toHaveLength(3);
    expect(c.media.filter((m) => m.kind === "image")).toHaveLength(4);
    expect(c.media.filter((m) => m.kind === "video")).toHaveLength(1);
    expect(c.organisations).toHaveLength(4);
  });

  it("reconciles goals and matches in the achievements with the totals", () => {
    const goals = 6 + 4 + 12;
    const matches = 9 + 7 + 17;
    expect(goals).toBe(c.stats[1].value);
    expect(matches).toBe(c.stats[0].value);
  });

  it("uses the original YouTube id", () => {
    expect(c.media.find((m) => m.kind === "video")?.youtubeId).toBe("rjg0Gb7vKhE");
  });
});
