import { Page } from '@playwright/test';

export class TrekpleisterHelpers {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async acceptCookies() {
    try {
      await this.page.waitForTimeout(5000);
      
      const cookieSelectors = [
        'button:has-text("Accepteren")',
        'button:has-text("Accept")',
        'button:has-text("Akkoord")',
        'button:has-text("Toestaan")',
        'button[id*="accept"]',
        'button[class*="accept"]',
        'button[data-cy*="accept"]',
        '#onetrust-accept-btn-handler',
        '[data-testid*="accept"]',
        '.cookie-accept',
        '.consent-accept',
        '[role="button"]:has-text("Accepteren")'
      ];

      for (const selector of cookieSelectors) {
        try {
          const button = this.page.locator(selector).first();
          if (await button.isVisible({ timeout: 5000 })) {

            await button.click({ timeout: 15000 });

            await this.page.waitForTimeout(3000);
            return;
          }
        } catch (error) {
          // Continua con il prossimo selettore
        }
      }
      
    } catch (error) {
      console.log(`Cookie acceptance failed: ${error.message}`);
    }
  }

  async setupPage() {
    await this.acceptCookies();
    
    // Aspetta per permettere caricamento completo
    await this.page.waitForTimeout(3000);
  }

  async simulateMouseMovement(delayMs: number = 500) {
    // Simula movimento naturale del mouse
    await this.page.mouse.move(100, 100);
    await this.page.waitForTimeout(delayMs);
    await this.page.mouse.move(300, 300, { steps: 10 });
    await this.page.waitForTimeout(delayMs);
    await this.page.mouse.move(500, 150, { steps: 10 });
    await this.page.waitForTimeout(delayMs);
  }
}