import { Page } from '@playwright/test';

export class KruidvatNlHelpers {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateWithRetry(url: string, maxRetries: number = 5) {
    const strategies = [
      { 
        waitUntil: 'commit' as const, 
        timeout: 30000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'nl-NL,nl;q=0.9,en;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      },
      { 
        waitUntil: 'domcontentloaded' as const, 
        timeout: 45000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      },
      { 
        waitUntil: 'load' as const, 
        timeout: 60000 
      }
    ];

    for (let i = 0; i < maxRetries; i++) {
      const strategy = strategies[i % strategies.length];
      
      try {
        console.log(`Attempt ${i + 1} to navigate to ${url} with strategy: ${strategy.waitUntil}`);
        
        // Set headers se specificati
        if (strategy.headers) {
          await this.page.setExtraHTTPHeaders(strategy.headers);
        }
        
        await this.page.goto(url, {
          waitUntil: strategy.waitUntil,
          timeout: strategy.timeout
        });
        
        // Aspetta un momento per permettere alla pagina di caricarsi
        await this.page.waitForTimeout(3000);
        
        // Verifica che la pagina sia effettivamente caricata
        try {
          const title = await this.page.title();
          if (title && title.length > 0 && !title.includes('Error')) {
            console.log(`Successfully navigated to ${url}. Title: ${title}`);
            return;
          }
        } catch (titleError) {
          console.log('Could not get title, but navigation might have succeeded');
        }
        
        // Verifica alternativa: controlla se esiste almeno un elemento nella pagina
        const bodyExists = await this.page.locator('body').isVisible({ timeout: 5000 });
        if (bodyExists) {
          console.log(`Successfully navigated to ${url} (body check)`);
          return;
        }
        
      } catch (error) {
        console.log(`Attempt ${i + 1} failed: ${error.message}`);
        
        if (i === maxRetries - 1) {
          throw new Error(`Failed to navigate to ${url} after ${maxRetries} attempts: ${error.message}`);
        }
        
        // Aspetta progressivamente più a lungo tra i tentativi (backoff)
        const waitTime = Math.min((i + 1) * 3000, 15000);
        console.log(`Waiting ${waitTime}ms before retry...`);
        await this.page.waitForTimeout(waitTime);
      }
    }
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
    try {
      console.log('Looking for cookie consent...');
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
            console.log(`Clicked cookie button with selector: ${selector}`);
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

  async bypassCDNChecks() {
    // Imposta headers che simulano un browser reale per evitare blocchi CDN
    await this.page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
      'Accept-Language': 'nl-NL,nl;q=0.9,en;q=0.8',
      'Accept-Encoding': 'gzip, deflate, br',
      'DNT': '1',
      'Connection': 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'none',
      'Sec-Fetch-User': '?1',
      'Cache-Control': 'max-age=0'
    });

    // Imposta viewport realistico
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  async setupPage() {
    await this.bypassCDNChecks();
    await this.selectLanguage();
    await this.acceptCookies();
    
    // Aspetta per permettere caricamento completo
    await this.page.waitForTimeout(3000);
  }
}