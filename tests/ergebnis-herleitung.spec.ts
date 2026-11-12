import { test, expect } from '@playwright/test';

/* Ausführbarer Spiegel von features/ergebnis-herleitung.feature
 * Contract Story: STORY-042 · evidenz: I-3, R-4 · dimension: Selbstbeschreibung
 * (playwright-bdd kann die .feature auch literal ausführen — siehe README.) */
test('Ergebnis-Herleitung öffnen und widersprechen', async ({ page }) => {
  // Given ich bin auf der Profilseite
  await page.goto('/ergebnisseite.html');
  // When ich an einer Kompetenz auf "Warum?" tippe
  await page.getByRole('button', { name: 'Warum?' }).first().click();
  // Then sehe ich die Herleitung
  await expect(page.getByTestId('herleitung')).toBeVisible();
  // And ich kann der Einschätzung widersprechen
  await expect(page.getByRole('button', { name: 'Widersprechen' })).toBeEnabled();
});
