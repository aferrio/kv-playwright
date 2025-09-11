import { test, expect } from '@playwright/test';

const BASE_URL = 'https://kvn.cmb8j9fjhz-emea2aswa1-s1-public.model-t.cc.commerce.ondemand.com/';
const TIMEOUT = 20000;

test('has title', async ({ page }) => {
  await page.goto(BASE_URL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Kruidvat Drogist/, { timeout: TIMEOUT });
});

test('should display the logo', async ({ page }) => {
  await page.goto(BASE_URL);

  // Sostituisci il selettore con quello corretto se necessario
  const logo = page.locator('img[alt="Kruidvat Logo"]');
  await expect(logo).toBeVisible();
});


test('should display the top products header', async ({ page }) => {
    await page.goto(BASE_URL);
 
    const topProductsHeader = page.locator('div[class*="top-products__content"]');
    await expect(topProductsHeader).toBeVisible({ timeout: TIMEOUT });
  });

test('should display main banner', async ({ page }) => {
    await page.goto(BASE_URL);
  
    const mainBanner = page.locator('div[class*="image-carousel__wrapper"]');
    await expect(mainBanner).toBeVisible({ timeout: TIMEOUT });
  });
 
// ...existing code...

test('should display the privacy link inside the e2-footer', async ({ page }) => {
  await page.goto(BASE_URL);

  // Cerca il footer con classe "e2-footer"
  const footer = page.locator('footer.e2-footer');
  await expect(footer).toBeVisible({ timeout: TIMEOUT });

  // Cerca il link "Privacy" all'interno del footer
  const privacyLink = footer.getByRole('link', { name: 'Privacy' });
  await expect(privacyLink).toBeVisible({ timeout: TIMEOUT });
  });