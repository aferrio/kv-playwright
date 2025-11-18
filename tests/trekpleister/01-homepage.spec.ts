import { test, expect } from '@playwright/test';
import { TrekpleisterHelpers } from '../../utils/trekpleister-helpers';

const TIMEOUT = 60000;

test.beforeEach(async ({ page }) => {
  const helpers = new TrekpleisterHelpers(page);
  await helpers.navigateWithRetry('/');
  await helpers.setupPage();
});


test('check correct hompeage', async ({ page }) => {
   await expect(page).toHaveTitle(/Trekpleister | Homepage/)

  // Verifica che il logo sia visibile
  const logo = page.locator('img[title="TP HIP Main Logo"]').first();
  await expect(logo).toBeVisible();
  
  // Verifica siano presenti gli elementi di navigazione
  const nav = page.locator('nav, [role="navigation"]').first();
  await expect(nav).toBeVisible({ timeout: TIMEOUT });

  // Verifica che il banner principale sia visibile
  const mainBanner = page.locator('div[class*="image-carousel__wrapper"]');
  await expect(mainBanner).toBeVisible();

  // Verifica che il carosello principale dei prodotti sia visibile
  const mainCarous = page.locator('div[class*="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-free-mode"]');
  await expect(mainCarous).toBeVisible();

   // Cerca il footer con classe "e2-footer"
  const footer = page.locator('footer.e2-footer');
  await expect(footer).toBeVisible();

  // Cerca il link "Privacy" all'interno del footer
  const privacyLink = footer.getByRole('link', { name: 'Privacy' });
  await expect(privacyLink).toBeVisible();

});





