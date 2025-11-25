import { test, expect } from '@playwright/test';
import { KruidvatNlHelpers } from '../../utils/kruidvat_nl-helpers';
import { beforeEach } from 'node:test';


let first = true;

test.beforeEach(async ({ page }) => {
    if (first) {
   const helpers = new KruidvatNlHelpers(page);
  await page.goto('/');
  await helpers.acceptCookies();
    first = false;
  }
});



test('should display cart heading with correct structure', async ({ page }) => {
  await page.goto('cart');
  
  // Verifica che sia presente l'h1 con le classi specifiche
  const cartHeading = page.locator('h1.heading-simple--cart.heading--no-bullets');
  await expect(cartHeading).toBeVisible();
  
  // Verifica che contenga il testo "Winkelmandje"
  await expect(cartHeading.locator('span.heading__word:has-text("Winkelmandje")')).toBeVisible();
});


test('should display minicart', async ({ page }) => {
  // Verifica che sia presente il minicart
  const minicart = page.locator('div.minicart');
  await expect(minicart).toBeVisible();
});
/*
test('should add NIVEA product to cart', async ({ page }) => {
  const helpers = new KruidvatNlHelpers(page);
  
  await page.goto('nivea-waterlily-oil-douchegel/p/3059659');
  
  // Accetta cookie banner se presente
  await helpers.acceptCookies();

  // Clicca sul pulsante "Add to cart"
  const addToCartButton = page.locator('button.add-to-cart__button.add-to-cart__button--increase[aria-label="Add to cart"]').first();
  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();

  await page.waitForTimeout(5000);
  
  // Naviga alla pagina del carrello
  await page.goto('cart');
  
  // Accetta cookie banner se presente anche sulla pagina cart
  await helpers.acceptCookies();
  
  // Verifica che sia presente il testo "NIVEA Waterlily & Oil Douchegel" nel carrello
  await expect(page.locator('text=NIVEA Waterlily & Oil Douchegel')).toBeVisible();
});
*/
