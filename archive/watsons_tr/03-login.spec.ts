import { test, expect } from '@playwright/test';
import { testConfig } from '../../config/test-config';

const BASE_URL = testConfig.watsons_tr_baseUrl;
const TIMEOUT = 60000;

test.beforeEach(async ({ page }) => {
  console.log(`Navigating to: ${BASE_URL}`);
  await page.goto(BASE_URL);
});

// ...existing code...

test('should display account create user page', async ({ page }) => {
  // Naviga alla pagina di registrazione
  await page.goto(`${BASE_URL}register`);
  
  // Verifica che sia presente il heading per la creazione dell'account
  const registerHeading = page.locator('h1.title:has-text("Watsons Dünyasına Katıl!")');
  await expect(registerHeading).toBeVisible({ timeout: TIMEOUT });
});


