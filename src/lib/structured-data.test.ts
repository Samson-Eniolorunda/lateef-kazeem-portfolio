import { describe, expect, it } from "vitest";
import { personJsonLd } from "./structured-data";

describe("personJsonLd", () => {
  it("describes the person from content", () => {
    const data = personJsonLd();
    expect(data["@type"]).toBe("Person");
    expect(data.name).toBe("Lateef Kazeem");
    expect(data.birthDate).toBe("2007-02-08");
  });
});
