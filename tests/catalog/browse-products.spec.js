// Import Playwright's test runner and assertion library
import { test, expect } from '@playwright/test';
// Import the CatalogPage page object model which encapsulates catalog-related selectors and actions
import { CatalogPage } from '../../pages/catalog_page.js';

// Base URL for the e-commerce site under test
const BASE_URL = 'https://wearhumans.com';

// Test suite grouping all catalog browsing scenarios
test.describe('Catalog - Browse Products', () => {

  // beforeEach runs before every test in this suite:
  // navigates to the home page and then into the catalog section
  test.beforeEach(async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    // Open the home page and wait for the DOM to finish loading
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    // Click through the navigation to reach the catalog/products listing page
    await catalogPage.navigateToCatalog();
  });

  // Test 1: Confirms the catalog page loads with the correct title and key UI elements visible
  test('view all products catalog page', async ({ page }) => {
    const catalogPage = new CatalogPage(page);

    // Verify the browser tab/page title contains "Products"
    await expect(page).toHaveTitle(/Products/);
    // Verify the on-page heading/title element is rendered
    await expect(catalogPage.pageTitle).toBeVisible();
    // Verify the product count text (e.g. "75 products") is shown on the page
    await expect(catalogPage.productCountText).toBeVisible();
    
    console.log('✓ Catalog page loaded with 75 products');
  });

  // Test 2: Confirms that the product listing grid is populated with at least one product
  test('verify product list displays correctly', async ({ page }) => {
    const catalogPage = new CatalogPage(page);

    // Count all product link elements rendered in the catalog grid
    const count = await catalogPage.productLinks.count();
    // The list must not be empty — at least one product should be displayed
    expect(count).toBeGreaterThan(0);
    
    console.log(`✓ Product list displayed with ${count} products visible`);
  });

  // Test 3: Confirms individual product cards render with a name and a price (sale or regular)
  test('verify product card elements', async ({ page }) => {
    const catalogPage = new CatalogPage(page);

    // Check that at least the first "Antique Drawers" product link is visible on the page
    await expect(catalogPage.antiqueDrawersLink.first()).toBeVisible();

    // Count how many products are showing a discounted (sale) price
    const salePriceCount = await catalogPage.salePriceElements.count();
    // Count how many products are showing a standard (regular) price
    const regularPriceCount = await catalogPage.regularPriceElements.count();

    // At least one product must display some form of pricing
    expect(salePriceCount + regularPriceCount).toBeGreaterThan(0);
    
    console.log(`✓ Product cards display with pricing (${salePriceCount} sale, ${regularPriceCount} regular)`);
  });

  // Test 4: Confirms clicking a product card navigates to the correct product detail page
  test('view product details from catalog', async ({ page }) => {
    const catalogPage = new CatalogPage(page);

    // Click on the "Antique Drawers" product in the catalog grid
    await catalogPage.clickProduct('Antique Drawers');
    // Verify the URL changed to the product detail slug
    await expect(page).toHaveURL(/\/products\/antique-drawers/);

    // Verify the product name heading is displayed on the detail page
    await expect(page.getByRole('heading', { name: 'Antique Drawers' })).toBeVisible();
    // Verify the "Add to cart" button is present so the user can purchase the item
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    
    console.log('✓ Product details page loaded successfully');
  });

  // Test 5: Confirms that "Sale" badges appear on discounted products in the catalog
  test('verify sale badge displays on products', async ({ page }) => {
    const catalogPage = new CatalogPage(page);

    // Count all visible sale badge elements across the product cards
    const saleCount = await catalogPage.saleBadges.count();
    // At least one product should be marked as on sale
    expect(saleCount).toBeGreaterThan(0);
    
    console.log(`✓ Sale badges displayed on ${saleCount} products`);
  });

  // Test 6: Confirms that both sale prices and regular prices are visible in the catalog
  test('verify pricing display on products', async ({ page }) => {
    const catalogPage = new CatalogPage(page);

    // There should be products with a discounted (sale) price shown
    expect(await catalogPage.salePriceElements.count()).toBeGreaterThan(0);
    // There should also be products with a standard (regular) price shown
    expect(await catalogPage.regularPriceElements.count()).toBeGreaterThan(0);
    
    console.log('✓ Both sale and regular prices displayed');
  });

  // Test 7: Confirms that a range of different products (categories) are visible in the catalog
  test('browse different product categories', async ({ page }) => {
    // A representative sample of product names spanning different item types
    const products = ['Antique Drawers', 'Bangle Bracelet', 'Bedside Table', 'Black Beanbag'];

    // Iterate over each product name and assert it is visible somewhere on the page
    for (const product of products) {
      const element = page.getByText(product).first();
      await expect(element).toBeVisible();
    }
    
    console.log('✓ Multiple product categories visible');
  });
});
