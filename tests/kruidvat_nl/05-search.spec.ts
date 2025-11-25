import { test, expect } from '@playwright/test';
import { KruidvatNlHelpers } from '../../utils/kruidvat_nl-helpers';

const TIMEOUT = 30000;


/*
test('should search for nivea products', async ({ page }) => {
await page.goto('/');
   const helpers = new KruidvatNlHelpers(page);
   
    await helpers.setupPage();

  // Trova il box di ricerca
  const searchBox = page.locator('input[type="text"].search-box__input[placeholder="Waar ben je naar op zoek?"]');
  await expect(searchBox).toBeVisible();
  
  // Inserisci il testo "nivea"
  await searchBox.fill('nivea');
  await searchBox.press('Enter');
  
  // Verifica che il container di ricerca sia presente
  const searchContainer = page.locator('div.container.plp-search div.plp-search-result');
  await expect(searchContainer).toBeVisible({ timeout: TIMEOUT });
  /*
  // Verifica che sia presente il testo "producten gevonden met de zoekterm" all'interno del container
  await expect(searchContainer.locator('text=producten gevonden met de zoekterm')).toBeVisible();
  
  // Verifica che sia presente il numero di risultati all'interno del container
  const searchResultsCount = searchContainer.locator('h1.plp-search-result__header span.text--success#searchAmountOfResults');
  await expect(searchResultsCount).toBeVisible({ timeout: TIMEOUT });
  
  // Verifica che il conteggio sia un numero positivo
  const countText = await searchResultsCount.textContent();
  const count = parseInt(countText || '0');
  expect(count).toBeGreaterThan(0);
});

*/