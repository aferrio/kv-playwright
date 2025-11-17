import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
 
  await page.goto(`/`);
});

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Kruidvat Drogist/);
});

test('should display the logo', async ({ page }) => {
  // Sostituisci il selettore con quello corretto se necessario
  const logo = page.locator('img[title="Kruidvat Logo"]').first();
  await expect(logo).toBeVisible();
});

test('should display the top products header', async ({ page }) => {
  const topProductsHeader = page.locator('div[class*="top-products__content"]');
  await expect(topProductsHeader).toBeVisible();
});

test('should display main banner', async ({ page }) => {
  const mainBanner = page.locator('div[class*="image-carousel__wrapper"]');
  await expect(mainBanner).toBeVisible();
});

test('should display the privacy link inside the e2-footer', async ({ page }) => {
  // Cerca il footer con classe "e2-footer"
  const footer = page.locator('footer.e2-footer');
  await expect(footer).toBeVisible();

  // Cerca il link "Privacy" all'interno del footer
  const privacyLink = footer.getByRole('link', { name: 'Privacy' });
  await expect(privacyLink).toBeVisible();
});

test('should display footer horizontal items', async ({ page }) => {
  // Verifica che sia presente la lista orizzontale del footer
  const footerHorizontalItems = page.locator('ul.footer-horizontal__items');
  await expect(footerHorizontalItems).toBeVisible();
});





