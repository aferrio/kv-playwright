import { test, expect } from '@playwright/test';
import { KruidvatNlHelpers } from '../../utils/kruidvat_nl-helpers';

test('should search for nivea products', async ({ page }) => {
  await page.goto('/');
  const helpers = new KruidvatNlHelpers(page);
  await helpers.acceptCookies();

  await page.goto('/search?q=nivea&text=nivea&searchType=manual');

  // Verifica che il container di ricerca sia presente
  const searchContainer = page.locator('div.plp-search-result');
  await expect(searchContainer).toBeVisible();

  // Verifica che sia presente il testo "Er zijn X producten gevonden met de zoekterm \"nivea\""
  const resultTextLocator = searchContainer.locator('text=/Er zijn \\d+ producten gevonden met de zoekterm "nivea"/');
  await expect(resultTextLocator).toBeVisible();
});

