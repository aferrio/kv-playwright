import { defineConfig, devices } from '@playwright/test';
import { SITES_CONFIG } from './config/sites.config';

// Configurazione per browser Chromium
const chromiumConfig = {
  actionTimeout: 10000,
  navigationTimeout: 20000,
  viewport: { width: 1500, height: 1080 },
  isMobile: false,
  hasTouch: false,
  
  extraHTTPHeaders: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'DNT': '1',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1',
    'Cache-Control': 'max-age=0',
    'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'none',
    'sec-fetch-user': '?1'
  },

  launchOptions: {
    args: [
      '--disable-blink-features=AutomationControlled',
      '--disable-features=VizDisplayCompositor,VizHitTestSurfaceLayer',
      '--disable-ipc-flooding-protection',
      '--disable-renderer-backgrounding',
      '--disable-backgrounding-occluded-windows',
      '--disable-background-timer-throttling',
      '--disable-background-networking',
      '--disable-default-apps',
      '--disable-extensions',
      '--disable-sync',
      '--disable-translate',
      '--hide-scrollbars',
      '--metrics-recording-only',
      '--mute-audio',
      '--no-reporting',
      '--no-default-browser-check',
      '--no-first-run',
      '--no-pings',
      '--no-sandbox',
      '--no-zygote',
      '--disable-dev-shm-usage',
      '--disable-http2',
      '--disable-web-security',
      '--ignore-certificate-errors',
      '--ignore-ssl-errors',
      '--ignore-certificate-errors-spki-list',
      '--ignore-certificate-errors-tls-handshake',
      '--disable-component-extensions-with-background-pages',
      '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    ]
  }
};


export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  
  // Timeout globale per ogni singolo test
  timeout: 20000,
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // Emulates the user locale.
    locale: 'nl-NL',

    // Emulates the user timezone.
    timezoneId: 'Europe/Amsterdam',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'KVNL - chromium',
      testDir: './tests/kruidvat_nl',
      use: { 
        baseURL: SITES_CONFIG.KRUIDVAT_NL.url,
        ...devices['Desktop Chrome'],
        ...chromiumConfig,
        extraHTTPHeaders: {
          ...chromiumConfig.extraHTTPHeaders,
          'Accept-Language': 'nl-NL,nl;q=0.9,en;q=0.8',
        }
      },
    },


    {
      name: 'KVB - chromium',
      testDir: './tests/kruidvat_be',
      use: { 
        baseURL: SITES_CONFIG.KRUIDVAT_BE.url,
        ...devices['Desktop Chrome'],
        ...chromiumConfig,
        extraHTTPHeaders: {
          ...chromiumConfig.extraHTTPHeaders,
          'Accept-Language': 'nl-BE,nl;q=0.9,fr;q=0.8,en;q=0.7',
        }
      },
    },

    {
      name: 'TP - chromium',
      testDir: './tests/trekpleister',
      use: { 
        baseURL: SITES_CONFIG.TREKPLEISTER.url,
        ...devices['Desktop Chrome'],
        ...chromiumConfig,
        extraHTTPHeaders: {
          ...chromiumConfig.extraHTTPHeaders,
          'Accept-Language': 'nl-NL,nl;q=0.9,en;q=0.8',
        }
      },
    },
  ],
});
