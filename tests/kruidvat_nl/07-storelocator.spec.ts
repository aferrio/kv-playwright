import { test, expect } from '@playwright/test';

test('should check store locator page', async ({ page }) => {

  await page.goto(`/winkelzoeker`);
  
  // Verifica che sia presente il tag h1 con classe "store-locator-title" e testo "Winkelzoeker"
  const winkelzoekerTitle = page.locator('h1.store-locator-title:has-text("Winkelzoeker")');
  await expect(winkelzoekerTitle).toBeVisible();
});







