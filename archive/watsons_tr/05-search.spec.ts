import { test, expect } from '@playwright/test';
import { testConfig } from '../../config/test-config';

const BASE_URL = testConfig.watsons_tr_baseUrl;
const TIMEOUT = 60000;

test.beforeEach(async ({ page }) => {
  console.log(`Navigating to: ${BASE_URL}`);
  await page.goto(BASE_URL);
});

test('should search for nivea products', async ({ page }) => {
  // Trova il box di ricerca
  const searchBox = page.locator('input.searchbox__input[placeholder="Ürün,kategori ya da marka ara"]');
  await expect(searchBox).toBeVisible({ timeout: TIMEOUT });
  
  // Inserisci il testo "nivea"
  await searchBox.fill('nivea');
  await searchBox.press('Enter');
  
  // Verifica che sia presente il prodotto Nivea nei risultati
  const searchResults = page.locator('h3.product-list-item__name:has-text("Nivea Creme Nemlendirici Krem 250 ml Bakım Yapan Koruma Tüm Ciltler")');
  await expect(searchResults).toBeVisible({ timeout: TIMEOUT });
});
