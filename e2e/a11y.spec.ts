import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const theme of ["light", "dark"] as const) {
  test(`axe: no WCAG 2.2 AA violations (${theme})`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme });
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });

  test(`screenshot (${theme})`, async ({ page }, info) => {
    await page.emulateMedia({ colorScheme: theme, reducedMotion: "reduce" });
    await page.goto("/");
    await page.evaluate(async () => {
      for (const img of Array.from(document.images)) img.loading = "eager";
      await Promise.all(
        Array.from(document.images).map((i) =>
          i.complete ? null : new Promise((r) => (i.onload = i.onerror = r)),
        ),
      );
    });
    await page.screenshot({
      path: `test-results/shots/${info.project.name}-${theme}.png`,
      fullPage: true,
    });
  });
}
