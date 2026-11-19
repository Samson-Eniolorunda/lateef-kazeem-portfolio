import { expect, test } from "@playwright/test";

test("renders all sections without sideways scroll", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Lateef Kazeem");
  for (const name of ["About", "Resume", "Portfolio"]) {
    await expect(page.getByRole("heading", { level: 2, name })).toBeVisible();
  }
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("hero buttons: secondary left, primary right, same row", async ({ page }) => {
  await page.goto("/");
  const secondary = await page
    .locator("#top")
    .getByRole("link", { name: "Contact", exact: true })
    .boundingBox();
  const primary = await page
    .getByRole("link", { name: "Download Player CV" })
    .boundingBox();
  expect(secondary && primary).toBeTruthy();
  expect(secondary!.x).toBeLessThan(primary!.x);
  expect(Math.abs(secondary!.y - primary!.y)).toBeLessThan(2);
  expect(primary!.height).toBeGreaterThanOrEqual(44);
});

test("portfolio filters and lightbox", async ({ page }) => {
  await page.goto("/");
  const grid = page.locator("#portfolio ul").last();
  await expect(grid.locator("li")).toHaveCount(5);
  await page.getByRole("button", { name: "YouTube Videos" }).click();
  await expect(grid.locator("li")).toHaveCount(1);
  await page.getByRole("button", { name: "Player Images" }).click();
  await expect(grid.locator("li")).toHaveCount(4);
  await grid.locator("button").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
});

for (const scheme of ["light", "dark"] as const) {
  test(`screenshot ${scheme}`, async ({ page }, info) => {
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto("/");
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: `screenshots/${info.project.name}-${scheme}.png`,
      fullPage: true,
    });
  });
}
