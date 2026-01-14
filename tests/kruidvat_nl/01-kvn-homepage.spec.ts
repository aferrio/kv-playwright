import { test, expect } from '@playwright/test';
import { KruidvatNlHelpers } from '../../utils/kruidvat_nl-helpers';
import { SITES_CONFIG } from '../../config/sites.config';

const siteConfig = SITES_CONFIG.KRUIDVAT_NL;


test.afterEach(async ({ page }) => {
  // Delay tra un test e l'altro
  await page.waitForTimeout(1000); // o 2000, 3000 a seconda della necessità
});


test.beforeEach(async ({ page }) => {
    await page.goto('/');

    const helpers = new KruidvatNlHelpers(page);
    await helpers.setupPage();
      // Simula movimento del mouse
    await helpers.simulateMouseMovement();
});

test('should have correct page title', async ({ page }) => {
  // Verifica che il titolo corrisponda a quello configurato in sites.config.ts
  // titlePattern è già un RegExp, quindi lo passiamo direttamente
  await expect(page).toHaveTitle(siteConfig.titlePattern);
});


test('should display all expected content', async ({ page }) => {
  // Verifica che tutti i testi definiti in expectedContent siano presenti in qualsiasi elemento della pagina
  for (const content of siteConfig.expectedContent) {
    await expect(page.locator(`text=${content}`)).toBeVisible();
  }
});


test('check full homepage', async ({ page }) => {
  // Sostituisci il selettore con quello corretto se necessario
  const logo = page.locator('img[title="Kruidvat Logo"]').first();
  await expect(logo).toBeVisible();

  // Verifica che sia presente la lista orizzontale del footer
  const footerHorizontalItems = page.locator('ul.footer-horizontal__items');
  await expect(footerHorizontalItems).toBeVisible()

  // Cerca il footer con classe "e2-footer"
  const footer = page.locator('footer.e2-footer');
  await expect(footer).toBeVisible();

  // Cerca il link "Privacy" all'interno del footer
  const privacyLink = footer.getByRole('link', { name: 'Privacy' });
  await expect(privacyLink).toBeVisible();
});
