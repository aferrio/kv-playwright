import { defineConfig, devices } from '@playwright/test';
import { testConfig } from './config/test-config';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    
    // Emulates the user locale.
    locale: 'nl-NL',

    // Emulates the user timezone.
    timezoneId: 'Europe/Amsterdam',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    viewport: { width: 1920, height: 1080 },
    isMobile: false,
    hasTouch: false,

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'KVNL - chromium',
      testDir: './tests/kruidvat_nl',
      use: { 
        baseURL: testConfig.kruidvat_nl_baseUrl,
        ...devices['Desktop Chrome'] },
    },

    {
      name: 'KVNL - Firefox',
      testDir: './tests/kruidvat_nl',
      use: { 
        baseURL: testConfig.kruidvat_nl_baseUrl,
        ...devices['Desktop Firefox'] },
    },

    {
      name: 'KVNL - Safari',
      testDir: './tests/kruidvat_nl',
      use: { 
        baseURL: testConfig.kruidvat_nl_baseUrl,
        ...devices['Desktop Safari'] },
    },

     {
      name: 'KVB - chromium',
      testDir: './tests/kruidvat_be',
      use: { 
        baseURL: testConfig.kruidvat_be_baseUrl,
        ...devices['Desktop Chrome'] },
    },

     {
      name: 'TP - chromium',
      testDir: './tests/trekpleister',
      use: { 
        baseURL: testConfig.trekpleister_baseUrl,
        ...devices['Desktop Chrome'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
