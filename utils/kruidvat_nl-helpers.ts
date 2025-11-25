import { Page } from '@playwright/test';

export class KruidvatNlHelpers {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async acceptCookies() {
    try {
      await this.page.waitForTimeout(3000);
      
      const cookieSelectors = [
        'button#onetrust-accept-btn-handler:has-text("Accepteer")',
        'button:has-text("Accepteren")',
        'button:has-text("Accept")',
        'button:has-text("Akkoord")',
        'button[id*="accept"]',
        'button[class*="accept"]',
        '[data-testid*="accept"]',
        '.cookie-accept',
        '.consent-accept'
      ];

      for (const selector of cookieSelectors) {
        try {
          const button = this.page.locator(selector);
          if (await button.isVisible({ timeout: 3000 })) {
            await button.click({ timeout: 10000 });

            await this.page.waitForTimeout(3000);
            return;
          }
        } catch (error) {
          console.log(`Selector ${selector} not found or not clickable`);
        }
      }
      
      console.log('No cookie consent found or already accepted');
    } catch (error) {
      console.log('Cookie accept process completed or not needed');
    }
  }

  async setupPage() {
    await this.acceptCookies();
    
    // Aspetta per permettere caricamento completo
    await this.page.waitForTimeout(3000);
  }
}