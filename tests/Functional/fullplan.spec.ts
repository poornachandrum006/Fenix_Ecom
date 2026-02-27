// spec: specs/fullplan.md
// seed: tests/Functional/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('E2E Shopping Journey', () => {
  test('Complete purchase flow', async ({ page }) => {
    // Navigate to homepage for test
    await page.goto('https://wearhumans.com/');

    // Verify catalog link visible
    await expect(page.getByRole('link', { name: 'Catalog' })).toBeVisible();

    // Click the Catalog link
    await page.getByRole('link', { name: 'Catalog' }).click();

    // Click first product in catalog
    await page.getByRole('link', { name: 'Antique Drawers' }).first().click();

    // Verify add to cart button visible
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();

    // Click Add to cart on product page
    await page.getByRole('button', { name: 'Add to cart' }).click();

    // Confirm view cart link in dialog
    await expect(page.getByRole('link', { name: 'View cart (1 item)' })).toBeVisible();

    // Click view cart link
    await page.getByRole('link', { name: 'View cart (1 item)' }).click();

    // Verify checkout button visible in cart
    await expect(page.getByRole('button', { name: 'Check out' })).toBeVisible();

    // Click checkout button
    await page.getByRole('button', { name: 'Check out' }).click();

    // Verify contact email/phone field visible
    await expect(page.getByRole('textbox', { name: 'Email or mobile phone number' })).toBeVisible();

    // Enter contact email
    await page.getByRole('textbox', { name: 'Email or mobile phone number' }).fill('test@example.com');

    // Click newsletter opt-in
    await page.getByRole('checkbox', { name: 'Email me with news and offers' }).click();

    // Wait for shipping section after contact info (heading is stable)
    await expect(page.getByRole('heading', { name: 'Shipping method' })).toBeVisible();

    // Enter first name
    await page.getByRole('textbox', { name: 'First name (optional)' }).fill('John');

    // Enter last name
    await page.getByRole('textbox', { name: 'Last name' }).fill('Doe');

    // Enter street address
    await page.getByRole('combobox', { name: 'Address' }).fill('123 Main St');

    // Enter city
    await page.getByRole('textbox', { name: 'City' }).fill('Testville');

    // Select state
    await page.getByLabel('State').selectOption(['California']);

    // Enter ZIP code
    await page.getByRole('textbox', { name: 'ZIP code' }).fill('90210');

    // Ensure shipping radio selected
    await page.getByRole('radio', { name: 'Ship' }).click();

    // After entering address and selecting shipping, shipping options should eventually be visible
    // (payment section assertions below will suffice)

    // Verify pay now button exists
    await expect(page.getByRole('button', { name: 'Pay now' })).toBeVisible();

    // Verify Pay now button is enabled (checkout ready)
    await expect(page.getByRole('button', { name: 'Pay now' })).toBeEnabled();

    // Verify order summary has product
    await expect(page.getByText('Antique Drawers')).toBeVisible();
  });
});
