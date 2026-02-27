import { test, expect } from '@playwright/test';

// Base URL constant
const BASE_URL = 'https://wearhumans.com';

test.describe('WearHumans Search and Buy Flow', () => {
  test('search for product and buy now', async ({ page }) => {
    // Step 1: Navigate to homepage
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/WearHumans/);
    
    // Step 2: Click search button
    await page.getByRole('button', { name: 'Search' }).click();
    
    // Step 3: Type "antique" in search field
    await page.getByPlaceholder(/search|type/i).fill('antique');
    await page.keyboard.press('Enter');
    
    // Step 4: Click on first search result
    await page.getByRole('link', { name: 'Antique Drawers' }).first().click();
    await expect(page).toHaveURL(/\/products\/antique-drawers/);
    
    // Step 5: Click Buy Now button
    await page.getByRole('button', { name: 'Buy it now' }).click();
    
    // Verify checkout page loaded
    await expect(page).toHaveURL(/\/checkouts/);
    await expect(page.getByRole('heading', { name: 'Contact' })).not.toBeVisible();
    await expect(page.getByRole('text', { name: 'Contact' })).not.toBeVisible();
    
    console.log('✓ Search and Buy flow completed: Search → First Result → Buy Now → Checkout');
  });
});
