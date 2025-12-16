import { test, expect } from '@playwright/test';


test('should display Voltaren product page correctly', async ({ page }) => {
  // Naviga alla pagina del prodotto Voltaren
  await page.goto(`/voltaren-k-12-5mg-diclofenac-kalium-filmomhulde-tabletten/p/228226`);
  
  // Verifica che sia presente il testo del nome del prodotto all'interno del tag h1
  const productTitle = page.locator('h1.product-title:has-text("Voltaren K 12,5mg Diclofenac-Kalium Filmomhulde Tabletten")');
  await expect(productTitle).toBeVisible();
  
  // Verifica che sia presente l'immagine del prodotto con il path parziale
  const productImage = page.locator('img.preview.selected[src*="/prd-front-228226-1_600x600/prd-front-228226-1-600x600.jpg"][alt="Geneesmiddel - 20 stuks"]');
  await expect(productImage).toBeVisible();
  
  // Verifica che sia presente il pulsante con il testo "Advies online drogist" all'interno del div specifico
  const adviceButton = page.locator('div.product-gallery__action span.button__text:has-text("Advies online drogist")');
  await expect(adviceButton).toBeVisible();
});


