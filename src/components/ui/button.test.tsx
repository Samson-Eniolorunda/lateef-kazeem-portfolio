import "@testing-library/jest-dom/vitest";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Button, ButtonRow } from "./button";

afterEach(cleanup);

describe("ButtonRow", () => {
  it("puts a single button on the right", () => {
    const { container } = render(
      <ButtonRow>
        <Button>One</Button>
      </ButtonRow>,
    );
    expect(container.firstElementChild).toHaveClass("justify-end");
  });
  it("splits two buttons to the left and right edges", () => {
    const { container } = render(
      <ButtonRow>
        <Button variant="secondary">Back</Button>
        <Button>Go</Button>
      </ButtonRow>,
    );
    expect(container.firstElementChild).toHaveClass("justify-between");
  });
});
