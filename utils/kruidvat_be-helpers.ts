import { Page } from '@playwright/test';

export class KruidvatBeHelpers {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectLanguage() {
    // Clicca sul pulsante lingua Nederlands
    const langSelectorButton = this.page.locator('button[aria-label="Nederlands"].button--big.button--full-width');
    try {
      await langSelectorButton.click({ timeout: 5000 });
    } catch (error) {
      // Se il pulsante non è presente o non è cliccabile, continua
      console.log('Lang selector button not found or not clickable');
    }
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
    await this.selectLanguage();
    await this.acceptCookies();
  }
}