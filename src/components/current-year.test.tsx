import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { CurrentYear } from "./current-year";

afterEach(cleanup);

describe("CurrentYear", () => {
  it("corrects a stale build year to the current year", async () => {
    render(<CurrentYear buildYear={2020} />);
    expect(await screen.findByText(String(new Date().getFullYear()))).toBeInTheDocument();
  });
});
