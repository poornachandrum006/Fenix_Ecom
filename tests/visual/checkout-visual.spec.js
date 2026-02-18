import { test, expect } from '@playwright/test';

// Base URL for the e-commerce store under test
const BASE_URL = 'https://wearhumans.com';

// ─────────────────────────────────────────────────────────────────────────────
// NOTE: Visual (snapshot) tests work in two modes:
//   1. FIRST RUN  → no baseline exists yet, so run with:
//        npx playwright test tests/visual/ --update-snapshots
//      Playwright will capture the current checkout page and save it as the
//      golden baseline in  tests/visual/__snapshots__/
//
//   2. SUBSEQUENT RUNS → Playwright compares the live page against the stored
//      baseline and fails if the pixel difference exceeds the threshold.
// ─────────────────────────────────────────────────────────────────────────────

test.describe('Visual Testing - Checkout Flow', () => {

  test(
    'checkout page snapshot after searching bracelet, adding to cart, and proceeding to checkout',
    async ({ page }) => {

      // ── Step 1: Navigate to the store home page ──────────────────────────
      // Load the home page and wait until the DOM is fully parsed before acting
      await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

      // ── Step 2: Search for "bracelet" using the site search ───────────────
      // Navigate directly to the Shopify search results URL – this is more
      // reliable than clicking the search icon which may vary across themes
      await page.goto(`${BASE_URL}/search?q=bracelet`, { waitUntil: 'domcontentloaded' });

      // Wait for at least one search result link to appear before continuing
      await page.waitForSelector('a[href*="/products/"]', { timeout: 15000 });

      // ── Step 3: Click on the first bracelet product in the results ────────
      // Grab the first product link that appears in the search results grid
      const firstProduct = page
        .locator('a[href*="/products/"]')
        .filter({ hasText: /bracelet/i })
        .first();

      // If the search engine does not return a "bracelet"-titled link fall back
      // to the very first product link on the results page
      const productLink = (await firstProduct.count()) > 0
        ? firstProduct
        : page.locator('a[href*="/products/"]').first();

      // Click through to the product detail page
      await productLink.click();
      await page.waitForLoadState('domcontentloaded');

      // ── Step 4: Add the product to the cart ──────────────────────────────
      // The "Add to cart" button is present on every Shopify product detail page
      const addToCartBtn = page.getByRole('button', { name: /add to cart/i });

      // Wait for the button to be visible and enabled before clicking
      await addToCartBtn.waitFor({ state: 'visible', timeout: 15000 });
      await addToCartBtn.click();

      // Give the cart drawer / AJAX cart update a moment to complete so the
      // item count badge on the cart icon reflects the new item
      await page.waitForTimeout(2500);

      // ── Step 5: Navigate to the cart page ────────────────────────────────
      // Go to /cart directly – works on all Shopify themes regardless of
      // whether the theme uses a slide-out drawer or a dedicated cart page
      await page.goto(`${BASE_URL}/cart`, { waitUntil: 'domcontentloaded' });

      // Confirm at least one cart line item is present, which means the product
      // was successfully added before we attempt to proceed to checkout
      await page.waitForSelector('form[action="/cart"]', { timeout: 15000 });

      // ── Step 6: Proceed to checkout ──────────────────────────────────────
      // Click the primary checkout button found in the cart form
      const checkoutBtn = page.getByRole('button', { name: /check out/i }).first();
      await checkoutBtn.waitFor({ state: 'visible', timeout: 15000 });
      await checkoutBtn.click();

      // Wait for the checkout page to finish loading – Shopify redirects to
      // checkout.shopify.com (or a custom checkout domain) so we wait for the
      // network to go idle before capturing the screenshot
      await page.waitForLoadState('networkidle', { timeout: 30000 });

      // Extra buffer so any lazy-loaded checkout UI elements (address fields,
      // order summary, payment widgets) have time to fully render
      await page.waitForTimeout(3000);

      // ── Step 7: Capture the full checkout page and compare visually ───────
      // `toHaveScreenshot` performs pixel-by-pixel comparison against the stored
      // baseline image. On the very first run (no baseline yet) use:
      //   npx playwright test tests/visual/ --update-snapshots
      //
      // maxDiffPixels: tolerance for minor rendering differences (anti-aliasing,
      //   font sub-pixel rendering, dynamic timestamps, etc.)
      // fullPage: true  – captures the entire scrollable page, not just viewport
      await expect(page).toHaveScreenshot('checkout-full-page.png', {
        fullPage: true,
        maxDiffPixels: 300,
      });

    }
  );

});
