import { test, expect } from '@playwright/test';
import { KruidvatNlHelpers } from '../../utils/kruidvat_nl-helpers';

const TIMEOUT = 30000;

test.beforeEach(async ({ page }) => {
  await page.goto(`/`);

  const helpers = new KruidvatNlHelpers(page);
  await helpers.setupPage();
});

test('should display Kruidvat Derma product page correctly', async ({ page }) => {
  // Naviga alla pagina del prodotto Kruidvat Derma
  await page.goto('kruidvat-derma-exfolierende-toner/p/6139866');
  
  // Verifica che sia presente il titolo del prodotto
  const productTitle = page.locator('h1.product-title[role="heading"][aria-level="2"]:has-text("Kruidvat Derma Exfoliërende Toner")');
  await expect(productTitle).toBeVisible({ timeout: TIMEOUT });
  
  // Verifica che sia presente il prezzo del prodotto all'interno del product-about__right
  const priceContainer = page.locator('div.product-about__right div.pricebadge__wrapper div.pricebadge__new-price-wrapper div.pricebadge__new-price').first();
  await expect(priceContainer).toBeVisible({ timeout: TIMEOUT });
  
  // Verifica i componenti specifici del prezzo all'interno del wrapper
  const priceDecimal = page.locator('div.product-about__right div.pricebadge__wrapper div.pricebadge__new-price-wrapper div.pricebadge__new-price-decimal:has-text("5")');
  await expect(priceDecimal).toBeVisible({ timeout: TIMEOUT });
  
  const priceSeparator = page.locator('div.product-about__right div.pricebadge__wrapper div.pricebadge__new-price-wrapper div.pricebadge__new-price-separator:has-text(".")');
  await expect(priceSeparator).toBeVisible({ timeout: TIMEOUT });
  
  const priceFractional = page.locator('div.product-about__right div.pricebadge__wrapper div.pricebadge__new-price-wrapper div.pricebadge__new-price-fractional:has-text("99")');
  await expect(priceFractional).toBeVisible({ timeout: TIMEOUT });
  
  // Verifica che sia presente l'indicazione di disponibilità
  const stockInfo = page.locator('span.e2-cta__description--info[data-stock="inStock"]:has-text("Online op voorraad.")');
  await expect(stockInfo).toBeVisible({ timeout: TIMEOUT });
});





