import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Contact } from "./contact";

afterEach(cleanup);

describe("Contact", () => {
  it("shows a notice and disables the form when unavailable", () => {
    render(<Contact available={false} />);
    expect(
      screen.getByText("The contact form is not yet available. Please return later."),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeDisabled();
    expect(screen.getByLabelText("Email")).toBeDisabled();
    expect(screen.getByLabelText("Message")).toBeDisabled();
    expect(screen.getByRole("button", { name: "Send message" })).toBeDisabled();
  });
  it("is enabled without a notice when available", () => {
    render(<Contact available />);
    expect(screen.queryByText(/not yet available/)).toBeNull();
    expect(screen.getByLabelText("Name")).toBeEnabled();
    expect(screen.getByRole("button", { name: "Send message" })).toBeEnabled();
  });
});
