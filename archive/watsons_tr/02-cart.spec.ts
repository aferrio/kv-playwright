import { test, expect } from '@playwright/test';
import { testConfig } from '../../config/test-config';

const BASE_URL = testConfig.watsons_tr_baseUrl;

test.beforeEach(async ({ page }) => {
  console.log(`Navigating to: ${BASE_URL}`);
  await page.goto(BASE_URL);
});

test('should display cart heading in shopping cart page', async ({ page }) => {
  // Naviga alla pagina del carrello
  await page.goto(`${BASE_URL}cart`);
  
  
  // Verifica che sia presente il div con il summary del carrello
  const cartSummary = page.locator('div.cart-header__summary:has-text("SEPETİNDEKİ ÜRÜNLER (0 ürün)")');
  await expect(cartSummary).toBeVisible();
  
  // Verifica che sia presente l'elemento span con "Toplam" all'interno del div.total
  const totalLabel = page.locator('div.total span.label:has-text("Toplam")');
  await expect(totalLabel).toBeVisible();
});