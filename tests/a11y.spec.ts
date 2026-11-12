import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Ergebnisseite erfüllt WCAG 2.1 AA (UX Contract: nicht_funktional.a11y)', async ({ page }) => {
  await page.goto('/ergebnisseite.html');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
