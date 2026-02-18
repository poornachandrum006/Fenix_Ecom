import { test, expect } from '@playwright/test';

// Base URL constant
const BASE_URL = 'https://wearhumans.com';

test.describe('WearHumans E2E Flow', () => {
  test('complete e2e flow - homepage to checkout', async ({ page }) => {
    // Step 1: Navigate to homepage
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveTitle(/WearHumans/);
    
    // Step 2: Click catalog
    await page.getByRole('link', { name: 'Catalog' }).click();
    await expect(page).toHaveURL(/\/collections\/all/);
    await expect(page).toHaveTitle('Products – WearHumans');
    
    // Step 3: Click first item (Antique Drawers)
    await page.getByRole('link', { name: 'Antique Drawers' }).first().click();
    await expect(page).toHaveURL(/\/products\/antique-drawers/);
    
    // Step 4: Add to cart
    await page.getByRole('button', { name: 'Add to cart' }).click();
    
    // Verify item added modal appears
    await expect(page.getByRole('dialog', { name: 'Just added to your cart' })).toBeVisible({ timeout: 10000 });
    
    // Step 5: Go to cart
    await page.getByRole('link', { name: /View cart/ }).click();
    await expect(page).toHaveURL(/\/cart/);
    await expect(page).toHaveTitle(/Your Shopping Cart/);
    
    // Verify cart contains the item
    await expect(page.getByText('Antique Drawers')).toBeVisible({ timeout: 10000 });
    
    // Step 6: Go to checkout
    await page.getByRole('button', { name: 'Check out' }).click();
    await expect(page).toHaveURL(/\/checkouts/, { timeout: 15000 });
    
    // Verify checkout page loaded with all sections
    await expect(page.getByRole('heading', { name: 'Contact' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('heading', { name: 'Delivery' })).toBeVisible({ timeout: 10000 });
    await expect(page.getBycRole('heading', { name: 'Payment' })).toBeVisible({ timeout: 10000 });
    
    console.log('✓ E2E flow completed: Homepage → Catalog → Product → Cart → Checkout');
  });
});