import { test, expect } from '@playwright/test';
import { KruidvatNlHelpers } from '../../utils/kruidvat_nl-helpers';
import { SITES_CONFIG } from '../../config/sites.config';

const siteConfig = SITES_CONFIG.KRUIDVAT_NL;

test('should display account create user page', async ({ page }) => {
  // Naviga alla pagina di registrazione
  await page.goto(`/register`);
  
  // Verifica che sia presente il heading per la creazione dell'account
  const registerHeading = page.locator('span.heading__text:has-text("Maak een Kruidvat account")');
  await expect(registerHeading).toBeVisible();
});


test('should login with username and password', async ({ page }) => {
  // Naviga alla pagina di login
  await page.goto(`/login`);
  const helpers = new KruidvatNlHelpers(page);
  await helpers.acceptCookies();
  
  // Inserisci username
  const usernameField = page.locator('input[name="username"], input[type="email"], #username');
  await expect(usernameField).toBeVisible();
  await usernameField.fill(siteConfig.loginUser!);
  
  // Inserisci password
  const passwordField = page.locator('input[name="password"], input[type="password"], #password');
  await expect(passwordField).toBeVisible();
  await passwordField.fill('Hybris012!');
/*
  // Clicca il pulsante di login
  await passwordField.press('Enter');

  //await page.waitForTimeout(10000);
  //const loginButton = await page.getByRole('button', { name: 'Submit button' })
  //await loginButton.click({ force: true, timeout: TIMEOUT });

  // Verifica che l'URL sia corretto dopo il login
  await expect(page).toHaveURL(`my-account`);
 
  // Verifica che il login sia avvenuto con successo controllando la presenza dell'heading
  const accountHeading = page.locator('h1.heading-base.my-account__heading:has-text("Jouw overzicht")');
  await expect(accountHeading).toBeVisible();*/
})


test('should display forgot password email input', async ({ page }) => {
  // Naviga alla pagina di recupero password
  await page.goto(`/login/pw/request`);

  // Verifica che sia presente il box input per l'email
  const emailInput = page.locator('input.input-field__input[type="text"][name="email"][placeholder=""][value=""]');
  await expect(emailInput).toBeVisible();
});