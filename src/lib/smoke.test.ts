import { describe, expect, it } from "vitest";
import { buttonClass } from "@/components/ui/button";

describe("buttonClass", () => {
  it("keeps a 44px minimum target", () => {
    expect(buttonClass("primary")).toContain("min-h-11");
    expect(buttonClass("secondary")).toContain("min-h-11");
  });
});
