import { test, expect } from '@playwright/test';
import { testConfig } from '../../config/test-config';

const BASE_URL = testConfig.watsons_tr_baseUrl;

test.beforeEach(async ({ page }) => {
  console.log(`Navigating to: ${BASE_URL}`);
  await page.goto(BASE_URL);
});

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Kozmetik Ürünleri ve En Sevilen Kozmetik Markaları | Watsons/);
});

test('should display the logo', async ({ page }) => {
  // Sostituisci il selettore con quello corretto se necessario
  const logo = page.locator('img[title="Watsons Kozmetik Ürünleri"]').first();
  await expect(logo).toBeVisible();
});

test('should display promotional banner image', async ({ page }) => {
  // Verifica che sia presente l'immagine del banner promozionale
  const promoBanner = page.locator('img.lazyload.promo-responsive-banner__image[alt="11-11-mny-sky.png"][src="https://media.watsons.com.tr/medias/sys_master/images/hcb/h30/13336185700382/11-11-mny-sky/11-11-mny-sky.png"]');
  await expect(promoBanner).toBeVisible();
});

test('should load homepage within 10 seconds', async ({ page }) => {
  const startTime = Date.now();
  
  // Naviga alla homepage
  await page.goto(BASE_URL);
  
  // Aspetta che la pagina sia completamente caricata
  await page.waitForLoadState('networkidle');
  
  const loadTime = Date.now() - startTime;
  
  // Verifica che il tempo di caricamento sia inferiore a 5 secondi (5000ms)
  expect(loadTime).toBeLessThan(10000);
  
  console.log(`Homepage loaded in ${loadTime}ms`);
});





