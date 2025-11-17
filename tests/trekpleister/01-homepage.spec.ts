import { test, expect } from '@playwright/test';


test.beforeEach(async ({ page }) => {

  await page.goto(`/`);
});

test('has title', async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Trekpleister | Homepage/)
});

test('should display the logo', async ({ page }) => {
  // Sostituisci il selettore con quello corretto se necessario
  const logo = page.locator('img[title="TP HIP Main Logo"]').first();
  await expect(logo).toBeVisible();
});


test('should display main banner', async ({ page }) => {
  const mainBanner = page.locator('div[class*="image-carousel__wrapper"]');
  await expect(mainBanner).toBeVisible();
});


test('should display main carousel', async ({ page }) => {
  const mainBanner = page.locator('div[class*="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-free-mode"]');
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






