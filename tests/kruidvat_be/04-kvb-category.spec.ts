import { test, expect } from '@playwright/test';
import { KruidvatBeHelpers } from '../../utils/kruidvat_be-helpers';

const TIMEOUT = 60000;

test('should display product list in makeup category', async ({ page }) => {
  // Naviga alla categoria make-up
  await page.goto(`/beauty/make-up`);
   const helpers = new KruidvatBeHelpers(page);
  await helpers.setupPage();

  // Verifica che sia presente il tag e2-product-list con id="productList"
  const productList = page.locator('e2-product-list#productList');
  await expect(productList).toBeVisible({ timeout: TIMEOUT });
});
/*
test('should navigate to beauty category from Homepage', async ({ page }) => {
  await page.goto(`/`);
     const helpers = new KruidvatBeHelpers(page);
  await helpers.setupPage();
     
  // Trova e clicca il link Beauty esatto
  const beautyLink = page.locator('a[href="/nl/beauty"][class="nav__link-inner--main"][title="Beauty"][data-uw-rm-brl="PR"][data-uw-original-href="/nl/beauty"]').first();
  await expect(beautyLink).toBeVisible({ timeout: TIMEOUT });
  await beautyLink.click();
  
  // Verifica di essere atterrati sulla pagina corretta
  await expect(page).toHaveURL(`/nl/beauty`, { timeout: TIMEOUT });
  
  // Verifica che sia presente l'heading della categoria Beauty
  const heading = page.locator('h1.heading-base.heading-base--category');
  await expect(heading).toBeVisible({ timeout: TIMEOUT });
  await expect(heading).toHaveText('Beauty');
});
*/

test('should display filters in zelfzorg category', async ({ page }) => {
  // Naviga alla categoria zelfzorg
  await page.goto(`/gezondheid/zelfzorg`);
  
  // Verifica che sia presente l'elemento dei filtri
  const filters = page.locator('div.yCmsComponent.plp-filters.plp-filters--search');
  await expect(filters).toBeVisible({ timeout: TIMEOUT });
});


