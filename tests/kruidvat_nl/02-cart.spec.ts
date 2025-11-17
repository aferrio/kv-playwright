import { test, expect } from '@playwright/test';
import { KruidvatNlHelpers } from '../../utils/kruidvat_nl-helpers';


const TIMEOUT = 30000;

test.beforeEach(async ({ page }) => {
  await page.goto(`/`);

  const helpers = new KruidvatNlHelpers(page);
  await helpers.setupPage();
});

test('should display cart heading in shopping cart page', async ({ page }) => {
  // Naviga alla pagina del carrello
  await page.goto(`cart`);
  
  // Verifica che sia presente l'heading del carrello con il testo "Winkelmandje"
  const cartHeading = page.locator('h1.heading.m-bottom-medium.m-top-large.heading-simple--cart.heading--no-bullets.heading-simple.heading--one-word');
  await expect(cartHeading).toBeVisible();
  await expect(cartHeading).toHaveText('Winkelmandje');
});

test('should display minicart', async ({ page }) => {

  // Verifica che sia presente il minicart
  const minicart = page.locator('div.minicart');
  await expect(minicart).toBeVisible();
});

test('should add NIVEA Crème product to cart', async ({ page }) => {
  // Naviga alla pagina del prodotto NIVEA Crème
  await page.goto('nivea-creme/p/31306');

  
  // Clicca sul pulsante "Add to cart" contenuto nella sezione add-to-cart e nel div e2-cta__price-container
  const addToCartButton = page.locator('div.e2-cta__price-container section.add-to-cart.add-to-cart--big button.add-to-cart__button.add-to-cart__button--increase[aria-label="Add to cart"]');
  await expect(addToCartButton).toBeVisible({ timeout: TIMEOUT });
  await addToCartButton.click();

  await page.waitForTimeout(3000); // Attendi 3 secondi per assicurarti che il prodotto sia stato aggiunto al carrello
  
  // Naviga alla pagina del carrello
  await page.goto('cart');
  
  // Verifica che sia presente il prodotto NIVEA Crème nel carrello
  const productName = page.locator('div.product-summary__desc.product-summary__desc--name.product-summary__description-name:has-text("NIVEA Crème")');
  await expect(productName).toBeVisible({ timeout: TIMEOUT });
});

