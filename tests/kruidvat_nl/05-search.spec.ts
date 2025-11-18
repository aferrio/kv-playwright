import { test, expect } from '@playwright/test';
import { KruidvatNlHelpers } from '../../utils/kruidvat_nl-helpers';

const TIMEOUT = 60000;

test.beforeEach(async ({ page }) => {
   const helpers = new KruidvatNlHelpers(page);
    await helpers.navigateWithRetry('/');
    await helpers.setupPage();
});


test('should search for nivea products', async ({ page }) => {
  // Trova il box di ricerca
  const searchBox = page.locator('input[type="text"].search-box__input[placeholder="Waar ben je naar op zoek?"]');
  await expect(searchBox).toBeVisible({ timeout: TIMEOUT });
  
  // Inserisci il testo "nivea"
  await searchBox.fill('nivea');
  await searchBox.press('Enter');
  
  // Verifica che sia presente l'header con i risultati della ricerca
  const searchResultsHeader = page.locator('h1.plp-search-result__header:has-text("producten gevonden met de zoekterm \\"nivea\\"")');
  await expect(searchResultsHeader).toBeVisible({ timeout: TIMEOUT });
  
  // Verifica che sia presente il numero di risultati
  const searchResultsCount = page.locator('h1.plp-search-result__header span.text--success#searchAmountOfResults');
  await expect(searchResultsCount).toBeVisible({ timeout: TIMEOUT });
  
  // Verifica che il conteggio sia un numero positivo
  const countText = await searchResultsCount.textContent();
  const count = parseInt(countText || '0');
  expect(count).toBeGreaterThan(0);
});
