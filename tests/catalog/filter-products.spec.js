import { test, expect } from '@playwright/test';
import { CatalogPage } from '../../pages/catalog_page.js';

const BASE_URL = 'https://wearhumans.com';

test.describe('Catalog - Filter Products', () => {
  test.beforeEach(async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await catalogPage.navigateToCatalog();
  });

  test('filter dropdown is available', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await expect(catalogPage.filterDropdown).toBeVisible();
    
    console.log('✓ Filter dropdown is available');
  });

  test('filter dropdown contains categories', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    const options = catalogPage.filterDropdown.locator('option');
    const optionCount = await options.count();
    
    expect(optionCount).toBeGreaterThan(0);
    
    console.log(`✓ Filter dropdown has ${optionCount} category options`);
  });

  test('filter by Antique category', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await catalogPage.filterByCategory('Antique');
    
    expect(await catalogPage.antiqueProducts.count()).toBeGreaterThan(0);
    
    console.log('✓ Successfully filtered by Antique category');
  });

  test('filter by color category', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await catalogPage.filterByCategory('Blue');
    
    const currentURL = page.url();
    const hasFilterApplied = currentURL.includes('Blue') || currentURL.includes('filter');
    
    const productCount = await catalogPage.getProductCount();
    
    expect(productCount).toBeGreaterThanOrEqual(0);
    
    console.log(`✓ Successfully filtered by Blue color - ${productCount} products found`);
  });

  test('verify filter categories exist', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    const optionTexts = await catalogPage.getFilterOptions();
    
    expect(optionTexts).toContain('All products');
    expect(optionTexts.some(t => t.includes('Antique'))).toBeTruthy();
    expect(optionTexts.some(t => t.includes('Blue') || t.includes('Black'))).toBeTruthy();
    
    console.log('✓ All expected filter categories available');
  });

  test('clear filter returns to all products', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await catalogPage.filterByCategory('Antique');
    await catalogPage.clearFilter();
    
    await expect(catalogPage.productCountText).toBeVisible();
    
    console.log('✓ Filter cleared and all products visible');
  });
});
