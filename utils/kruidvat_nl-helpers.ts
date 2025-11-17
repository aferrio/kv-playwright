import { Page } from '@playwright/test';

export class KruidvatNlHelpers {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async acceptCookies() {
    // Clicca sul pulsante per accettare i cookie se presente
    const acceptButton = this.page.locator('button#onetrust-accept-btn-handler:has-text("Accepteer")');
    try {
      await acceptButton.click({ timeout: 5000 });
    } catch (error) {
      // Se il pulsante non è presente o non è cliccabile, continua
      console.log('Cookie accept button not found or not clickable');
    }
  }

  async setupPage() {
    await this.acceptCookies();
  }
}