import { test, expect } from '@playwright/test';
import { testConfig } from '../../config/test-config';

const BASE_URL = testConfig.watsons_tr_baseUrl;
const TIMEOUT = 60000;

test.beforeEach(async ({ page }) => {
  console.log(`Navigating to: ${BASE_URL}`);
  await page.goto(BASE_URL);
});

test('should display Oral-B product page correctly', async ({ page }) => {
  // Naviga alla pagina del prodotto Voltaren
  await page.goto(`${BASE_URL}oral-b-dis-fircasi-yedek-basligi-cross-action-2-adet/p/BP_153603`);
  
  // Verifica che sia presente il titolo del prodotto
  const productTitle = page.locator('h1.product-details-title__text:has-text("Oral-B Diş Fırçası Yedek Başlığı Cross Action 2 Adet")');
  await expect(productTitle).toBeVisible({ timeout: TIMEOUT });
  
  // Verifica che sia presente l'immagine del prodotto
  const productImage = page.locator('img[alt*="ORAL-B Oral-B Diş Fırçası Yedek Başlığı Cross Action 2 Adet"][src="https://media.watsons.com.tr/medias/sys_master/prd-images/h35/h07/11258392510494/prd-front-153603_1200x1200/prd-front-153603-1200x1200.jpg"]');
  await expect(productImage).toBeVisible({ timeout: TIMEOUT });
  
  
});


