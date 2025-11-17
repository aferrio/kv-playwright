import { test, expect } from '@playwright/test';
import { testConfig } from '../../config/test-config';

const BASE_URL = testConfig.watsons_tr_baseUrl;

test.beforeEach(async ({ page }) => {
  console.log(`Navigating to: ${BASE_URL}`);
  await page.goto(BASE_URL);
});

test('should navigate to store locator page', async ({ page }) => {
  // Trova e clicca il link "Mağazalarımız" nel footer
  const magazalarimizLink = page.locator('a.footer-link-group__link[href="/magazabulucu"]:has-text("Mağazalarımız")').first;
  await expect(magazalarimizLink).toBeVisible();
  await magazalarimizLink.click();
  
  // Verifica che sia presente il tag h1 con classe "page-title" e testo "MAĞAZA BUL"
  const pageTitleHeading = page.locator('h1.page-title:has-text("MAĞAZA BUL")');
  await expect(pageTitleHeading).toBeVisible();
});







