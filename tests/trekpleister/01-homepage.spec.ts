import { test, expect } from '@playwright/test';
import { TrekpleisterHelpers } from '../../utils/trekpleister-helpers';

import { SITES_CONFIG } from '../../config/sites.config';

const siteConfig = SITES_CONFIG.TREKPLEISTER;

test.beforeEach(async ({ page }) => {
  const helpers = new TrekpleisterHelpers(page);
  await page.goto('/');
  await helpers.setupPage();
});


test('should have correct page title', async ({ page }) => {
  // Verifica che il titolo corrisponda a quello configurato in sites.config.ts
  // titlePattern è già un RegExp, quindi lo passiamo direttamente
  await expect(page).toHaveTitle(siteConfig.titlePattern);
});

test('should display all expected content', async ({ page }) => {
  // Seleziona il main content container
  const mainContent = page.locator('main.e2-main');
  await expect(mainContent).toBeVisible();
  
  // Verifica che tutti i testi definiti in expectedContent siano presenti all'interno del main
  for (const content of siteConfig.expectedContent) {
    await expect(mainContent.locator(`text=${content}`).first()).toBeVisible();
  }
});



test('check correct homepage', async ({ page }) => {

  // Verifica che il logo sia visibile
  const logo = page.locator('img[title="TP HIP Main Logo"]').first();
  await expect(logo).toBeVisible();
  
  // Verifica siano presenti gli elementi di navigazione
  const nav = page.locator('nav, [role="navigation"]').first();
  await expect(nav).toBeVisible();

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





