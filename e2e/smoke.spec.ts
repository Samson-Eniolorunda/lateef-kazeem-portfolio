import { expect, test } from "@playwright/test";

test("home renders the name", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Lateef Kazeem");
});
