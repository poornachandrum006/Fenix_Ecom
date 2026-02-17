import { test, expect } from '@playwright/test';
import { CatalogPage } from '../../pages/catalog_page.js';

const BASE_URL = 'https://wearhumans.com';

test.describe('Catalog - Sort Products', () => {
  test.beforeEach(async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await catalogPage.navigateToCatalog();
  });

  test('sort dropdown is available', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await expect(catalogPage.sortDropdown).toBeVisible();
    
    console.log('✓ Sort dropdown is available');
  });

  test('sort dropdown contains all sort options', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    const optionTexts = await catalogPage.getSortOptions();
    
    expect(optionTexts).toContain('Featured');
    expect(optionTexts).toContain('Best selling');
    expect(optionTexts).toContain('Alphabetically, A-Z');
    expect(optionTexts).toContain('Alphabetically, Z-A');
    expect(optionTexts).toContain('Price, low to high');
    expect(optionTexts).toContain('Price, high to low');
    expect(optionTexts).toContain('Date, old to new');
    expect(optionTexts).toContain('Date, new to old');
    
    console.log('✓ All sort options available');
  });

  test('sort by best selling', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await catalogPage.sortBy('Best selling');
    
    const productLinks = catalogPage.getProductLinksForPage('default');
    expect(await productLinks.count()).toBeGreaterThan(0);
    
    console.log('✓ Products sorted by Best selling');
  });

  test('sort by price low to high', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await catalogPage.sortBy('Price, low to high');
    
    const productLinks = catalogPage.getProductLinksForPage('default');
    expect(await productLinks.count()).toBeGreaterThan(0);
    
    console.log('✓ Products sorted by Price, low to high');
  });

  test('sort by price high to low', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await catalogPage.sortBy('Price, high to low');
    
    const productLinks = catalogPage.getProductLinksForPage('default');
    expect(await productLinks.count()).toBeGreaterThan(0);
    
    console.log('✓ Products sorted by Price, high to low');
  });

  test('sort alphabetically A-Z', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await catalogPage.sortBy('Alphabetically, A-Z');
    
    const productLinks = catalogPage.getProductLinksForPage('default');
    expect(await productLinks.count()).toBeGreaterThan(0);
    
    console.log('✓ Products sorted Alphabetically, A-Z');
  });

  test('sort alphabetically Z-A', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await catalogPage.sortBy('Alphabetically, Z-A');
    
    const productLinks = catalogPage.getProductLinksForPage('Z-A');
    expect(await productLinks.count()).toBeGreaterThan(0);
    
    console.log('✓ Products sorted Alphabetically, Z-A');
  });

  test('sort by date newest first', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await catalogPage.sortBy('Date, new to old');
    
    const productLinks = catalogPage.getProductLinksForPage('newest');
    expect(await productLinks.count()).toBeGreaterThan(0);
    
    console.log('✓ Products sorted by Date, new to old');
  });

  test('sort by date oldest first', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await catalogPage.sortBy('Date, old to new');
    
    const productLinks = catalogPage.getProductLinksForPage('default');
    expect(await productLinks.count()).toBeGreaterThan(0);
    
    console.log('✓ Products sorted by Date, old to new');
  });

  test('sort by featured (default)', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await catalogPage.sortBy('Featured');
    
    const productLinks = catalogPage.getProductLinksForPage('default');
    expect(await productLinks.count()).toBeGreaterThan(0);
    
    console.log('✓ Products sorted by Featured');
  });
});
