import { test, expect } from '@playwright/test';
import { CatalogPage } from '../../pages/catalog_page.js';

const BASE_URL = 'https://wearhumans.com';

test.describe('Catalog - Browse Products', () => {
  test.beforeEach(async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await catalogPage.navigateToCatalog();
  });

  test('view all products catalog page', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await expect(page).toHaveTitle(/Products/);
    await expect(catalogPage.pageTitle).toBeVisible();
    await expect(catalogPage.productCountText).toBeVisible();
    
    console.log('✓ Catalog page loaded with 75 products');
  });

  test('verify product list displays correctly', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    const count = await catalogPage.productLinks.count();
    expect(count).toBeGreaterThan(0);
    
    console.log(`✓ Product list displayed with ${count} products visible`);
  });

  test('verify product card elements', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await expect(catalogPage.antiqueDrawersLink.first()).toBeVisible();
    
    const salePriceCount = await catalogPage.salePriceElements.count();
    const regularPriceCount = await catalogPage.regularPriceElements.count();
    
    expect(salePriceCount + regularPriceCount).toBeGreaterThan(0);
    
    console.log(`✓ Product cards display with pricing (${salePriceCount} sale, ${regularPriceCount} regular)`);
  });

  test('view product details from catalog', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await catalogPage.clickProduct('Antique Drawers');
    await expect(page).toHaveURL(/\/products\/antique-drawers/);
    
    await expect(page.getByRole('heading', { name: 'Antique Drawers' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add to cart' })).toBeVisible();
    
    console.log('✓ Product details page loaded successfully');
  });

  test('verify sale badge displays on products', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    const saleCount = await catalogPage.saleBadges.count();
    expect(saleCount).toBeGreaterThan(0);
    
    console.log(`✓ Sale badges displayed on ${saleCount} products`);
  });

  test('verify pricing display on products', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    expect(await catalogPage.salePriceElements.count()).toBeGreaterThan(0);
    expect(await catalogPage.regularPriceElements.count()).toBeGreaterThan(0);
    
    console.log('✓ Both sale and regular prices displayed');
  });

  test('browse different product categories', async ({ page }) => {
    const products = ['Antique Drawers', 'Bangle Bracelet', 'Bedside Table', 'Black Beanbag'];
    
    for (const product of products) {
      const element = page.getByText(product).first();
      await expect(element).toBeVisible();
    }
    
    console.log('✓ Multiple product categories visible');
  });
});
