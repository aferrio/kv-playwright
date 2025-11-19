import { test, expect } from '@playwright/test';
import { KruidvatNlHelpers } from '../../utils/kruidvat_nl-helpers';

const TIMEOUT = 30000;

test.beforeEach(async ({ page }) => {
  const helpers = new KruidvatNlHelpers(page);
  await helpers.navigateWithRetry('/');
  await helpers.setupPage();
});

test('should display Kruidvat Derma product page correctly', async ({ page }) => {
  const helpers = new KruidvatNlHelpers(page);
  
  // Naviga alla pagina del prodotto Kruidvat Derma
  await helpers.navigateWithRetry('kruidvat-derma-exfolierende-toner/p/6139866');
  
  // Verifica che sia presente il titolo del prodotto
  const productTitle = page.locator('h1.product-title[role="heading"][aria-level="2"]:has-text("Kruidvat Derma Exfoliërende Toner")');
  await expect(productTitle).toBeVisible({ timeout: TIMEOUT });
  
  // Verifica che sia presente il prezzo del prodotto all'interno del product-about__right
  const priceContainer = page.locator('div.product-about__right div.pricebadge__wrapper div.pricebadge__new-price-wrapper div.pricebadge__new-price').first();
  await expect(priceContainer).toBeVisible({ timeout: TIMEOUT });
  
  // Verifica che il prezzo decimale contenga un valore numerico
  const priceDecimal = page.locator('div.product-about__right div.pricebadge__wrapper div.pricebadge__new-price-wrapper div.pricebadge__new-price-decimal');
  await expect(priceDecimal).toBeVisible({ timeout: TIMEOUT });
  
  const priceDecimalText = await priceDecimal.textContent();
  const priceDecimalNumber = parseInt(priceDecimalText || '0');
  expect(priceDecimalNumber).toBeGreaterThan(0);
  expect(priceDecimalText).toMatch(/^\d+$/); // Verifica che sia solo numeri
  console.log(`Price decimal value: ${priceDecimalText}`);
  
  // Verifica che sia presente il separatore
  const priceSeparator = page.locator('div.product-about__right div.pricebadge__wrapper div.pricebadge__new-price-wrapper div.pricebadge__new-price-separator:has-text(".")');
  await expect(priceSeparator).toBeVisible({ timeout: TIMEOUT });
  
  // Verifica che il prezzo frazionale contenga un valore numerico
  const priceFractional = page.locator('div.product-about__right div.pricebadge__wrapper div.pricebadge__new-price-wrapper div.pricebadge__new-price-fractional');
  await expect(priceFractional).toBeVisible({ timeout: TIMEOUT });
  
  const priceFractionalText = await priceFractional.textContent();
  const priceFractionalNumber = parseInt(priceFractionalText || '0');
  expect(priceFractionalNumber).toBeGreaterThanOrEqual(0);
  expect(priceFractionalText).toMatch(/^\d+$/); // Verifica che sia solo numeri
  console.log(`Price fractional value: ${priceFractionalText}`);
  
  // Verifica che sia presente l'indicazione di disponibilità
  const stockInfo = page.locator('span.e2-cta__description--info[data-stock="inStock"]:has-text("Online op voorraad.")');
  await expect(stockInfo).toBeVisible({ timeout: TIMEOUT });
});





