import { test, expect } from '@playwright/test';

// Base URL constant
const BASE_URL = 'https://wearhumans.com';

test.describe('WearHumans Seed Setup', () => {
  test('seed', async ({ page }) => {
    // Navigate to base URL - wait only for DOM content loaded, not full page load
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/WearHumans/);
    
    console.log('✓ Base URL configured:', BASE_URL);
  });
});