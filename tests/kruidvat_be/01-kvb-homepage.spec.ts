import { test, expect } from '@playwright/test';
import { SITES_CONFIG } from '../../config/sites.config';

const siteConfig = SITES_CONFIG.KRUIDVAT_BE;


test.beforeEach(async ({ page }) => {

  await page.goto(`/`);
});

test('should have correct page title', async ({ page }) => {
  // Verifica che il titolo corrisponda a quello configurato in sites.config.ts
  // titlePattern è già un RegExp, quindi lo passiamo direttamente
  await expect(page).toHaveTitle(siteConfig.titlePattern);

      // Verifica la presenza del titolo in olandese
  const dutchTitle = page.locator('h4.multilanguage-popup__title[role="heading"][aria-level="3"]:has-text("WELKOM OP KRUIDVAT.BE")');
  await expect(dutchTitle).toBeVisible({timeout: 10000});
  
  // Verifica la presenza del titolo in francese
  const frenchTitle = page.locator('h4.multilanguage-popup__title:has-text("BIENVENUE SUR KRUIDVAT.BE")');
  await expect(frenchTitle).toBeVisible();
});


test('check we have full homepage', async ({ page }) => {

  // Sostituisci il selettore con quello corretto se necessario
  const logo = page.locator('img[title="Kruidvat Logo"]').first();
  await expect(logo).toBeVisible();

   // Cerca il footer con classe "e2-footer"
  const footer = page.locator('footer.e2-footer');
  await expect(footer).toBeVisible();

  // Cerca il link "Privacy" all'interno del footer
  const privacyLink = footer.getByRole('link', { name: 'Privacy' });
  await expect(privacyLink).toBeVisible();
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

