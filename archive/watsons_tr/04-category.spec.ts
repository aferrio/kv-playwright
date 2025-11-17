import { test, expect } from '@playwright/test';
import { testConfig } from '../../config/test-config';

const BASE_URL = testConfig.watsons_tr_baseUrl;
const TIMEOUT = 60000;

test.beforeEach(async ({ page }) => {
  console.log(`Navigating to: ${BASE_URL}`);
  await page.goto(BASE_URL);
});


test('should navigate to make-up category', async ({ page }) => {
  // Trova e clicca il link "Makyaj"
  const makyajLink = page.locator('a.nav-link[href="/makyaj/c/100"][aria-label="Makyaj"]');
  await expect(makyajLink).toBeVisible({ timeout: TIMEOUT });
  await makyajLink.click();
  
  // Verifica di essere atterrati sulla pagina corretta
  await expect(page).toHaveURL(`${BASE_URL}makyaj/c/100`, { timeout: TIMEOUT });
});

test('should navigate to beauty category', async ({ page }) => {
  // Trova e clicca l'elemento e2-impression-tracker "Beauty"
  const beautyElement = page.locator('e2-impression-tracker[data-click-text="Beauty"]');
  await expect(beautyElement).toBeVisible({ timeout: TIMEOUT });
  await beautyElement.click();
  
  // Verifica di essere atterrati sulla pagina corretta
  await expect(page).toHaveURL(`${BASE_URL}beauty`, { timeout: TIMEOUT });
  
  // Verifica che sia presente l'heading della categoria Beauty
  const categoryHeading = page.locator('h1.heading-base.heading-base--category:has-text("Beauty")');
  await expect(categoryHeading).toBeVisible({ timeout: TIMEOUT });
});

