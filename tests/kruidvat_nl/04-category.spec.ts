import { test, expect } from '@playwright/test';
import { KruidvatNlHelpers } from '../../utils/kruidvat_nl-helpers';

test.beforeEach(async ({ page }) => {
   await page.goto('/');

   const helpers = new KruidvatNlHelpers(page);
  await helpers.setupPage();
  
});

test('should display product list in makeup category', async ({ page }) => {
  // Naviga alla categoria make-up
  await page.goto(`beauty/make-up`);

  // Verifica che sia presente il tag e2-product-list con id="productList"
  const productList = page.locator('e2-product-list#productList');
  await expect(productList).toBeVisible();
});

test('should navigate to beauty category from Homepage', async ({ page }) => {
     
  // Trova e clicca il link Beauty che contiene l'e2-impression-tracker
  const beautyLink = page.locator('a[href="/beauty"].nav__link-inner--main[title="Beauty"]').first();
  await expect(beautyLink).toBeVisible();
  await beautyLink.click();
  
  // Verifica di essere atterrati sulla pagina corretta
  await expect(page).toHaveURL(`/beauty`);
  
  // Verifica che sia presente l'heading della categoria Beauty
  const heading = page.locator('h1.heading-base.heading-base--category');
  await expect(heading).toBeVisible();
  await expect(heading).toHaveText('Beauty');
});


test('should display filters in zelfzorg category', async ({ page }) => {
  // Naviga alla categoria zelfzorg
  await page.goto(`gezondheid/zelfzorg`);
  
  // Verifica che sia presente l'elemento dei filtri
  const filters = page.locator('div.yCmsComponent.plp-filters.plp-filters--search');
  await expect(filters).toBeVisible();
});


