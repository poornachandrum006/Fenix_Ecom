const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 120 * 1000,
  
  use: {
    baseURL: 'https://wearhumans.com',
    navigationTimeout: 30 * 1000,
    actionTimeout: 15 * 1000,
    trace: 'on-first-retry',
    screenshot: 'on', // Capture screenshots for ALL tests (pass and fail)
    video: 'retain-on-failure',
    headless: process.env.CI ? true : false, // Always headless in CI
  },

  reporter: process.env.CI ? [
    ['dot'], // Simple dot reporter for CI - no ANSI escape sequences
    ['allure-playwright', { 
      outputFolder: 'allure-results', 
      detail: true,
      includeTestSteps: true,
      attachments: {
        screenshot: {
          mode: 'always',
          fullPage: true
        },
        video: {
          mode: 'retain-on-failure'
        }
      }
    }],
  ] : [
    ['list'], // Fancy list reporter for local development
    ['allure-playwright', { 
      outputFolder: 'allure-results', 
      detail: true,
      includeTestSteps: true,
      attachments: {
        screenshot: {
          mode: 'always',
          fullPage: true
        },
        video: {
          mode: 'retain-on-failure'
        }
      }
    }],
  ],

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        // Additional args for CI stability
        launchOptions: {
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-first-run',
            '--no-default-browser-check',
            '--disable-extensions',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding',
          ],
        },
      },
    },
    // Firefox and WebKit projects commented out to run only in Chromium
    // {
    //   name: 'firefox',
    //   use: { 
    //     ...devices['Desktop Firefox'],
    //     // Firefox is generally more stable in CI environments
    //     launchOptions: {
    //       firefoxUserPrefs: {
    //         'media.navigator.streams.fake': true,
    //         'media.navigator.permission.disabled': true,
    //       },
    //     },
    //   },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
