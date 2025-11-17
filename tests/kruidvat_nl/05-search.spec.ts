import { test, expect } from '@playwright/test';

const TIMEOUT = 60000;

test.beforeEach(async ({ page }) => {
  await page.goto(`/`);
});


test('should search for nivea products', async ({ page }) => {
  // Trova il box di ricerca
  const searchBox = page.locator('input[type="text"].search-box__input[placeholder="Waar ben je naar op zoek?"]');
  await expect(searchBox).toBeVisible({ timeout: TIMEOUT });
  
  // Inserisci il testo "nivea"
  await searchBox.fill('nivea');
  await searchBox.press('Enter');
  
    
  // Verifica che sia presente il testo con i risultati della ricerca
  const searchResults = page.locator('text=producten gevonden met de zoekterm "nivea"');
  await expect(searchResults).toBeVisible({ timeout: TIMEOUT });
});
