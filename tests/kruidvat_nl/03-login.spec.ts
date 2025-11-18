import { test, expect } from '@playwright/test';
import { KruidvatNlHelpers } from '../../utils/kruidvat_nl-helpers';

const TIMEOUT = 60000;

test.beforeEach(async ({ page }) => {
    const helpers = new KruidvatNlHelpers(page);
    await helpers.navigateWithRetry('/');
    await helpers.setupPage();
});


test('should display account create user page', async ({ page }) => {
  // Naviga alla pagina di registrazione
  await page.goto(`/register`);
  
  // Verifica che sia presente il heading per la creazione dell'account
  const registerHeading = page.locator('span.heading__text:has-text("Maak een Kruidvat account")');
  await expect(registerHeading).toBeVisible({ timeout: TIMEOUT });
});


test('should login with username and password', async ({ page }) => {
  // Naviga alla pagina di login
  await page.goto(`/login`);
  
  // Inserisci username
  const usernameField = page.locator('input[name="username"], input[type="email"], #username');
  await expect(usernameField).toBeVisible({ timeout: TIMEOUT });
  await usernameField.fill('a.ferrio@eu.aswatson.com');
  
  // Inserisci password
  const passwordField = page.locator('input[name="password"], input[type="password"], #password');
  await expect(passwordField).toBeVisible({ timeout: TIMEOUT });
  await passwordField.fill('Hybris012!');

  // Clicca il pulsante di login
  await passwordField.press('Enter');

  await page.waitForTimeout(3000);
  //const loginButton = await page.getByRole('button', { name: 'Submit button' })
  //await loginButton.click({ force: true, timeout: TIMEOUT });

  // Verifica che l'URL sia corretto dopo il login
  await expect(page).toHaveURL(`/my-account`, { timeout: TIMEOUT });
 
  // Verifica che il login sia avvenuto con successo controllando la presenza dell'heading
  const accountHeading = page.locator('h1.heading-base.my-account__heading:has-text("Jouw overzicht")');
  await expect(accountHeading).toBeVisible({ timeout: TIMEOUT });
});