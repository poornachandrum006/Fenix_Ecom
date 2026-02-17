const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 120 * 1000,
  
  use: {
    baseURL: 'https://wearhumans.com',
    navigationTimeout: 30 * 1000, // 30 seconds
    actionTimeout: 15 * 1000,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: false,
  },

  reporter: [
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results', detail: true }],
  ],

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
