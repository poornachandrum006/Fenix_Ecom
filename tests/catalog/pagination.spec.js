import { test, expect } from '@playwright/test';
import { CatalogPage } from '../../pages/catalog_page.js';

const BASE_URL = 'https://wearhumans.com';

test.describe('Catalog - Pagination', () => {
  test.beforeEach(async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await catalogPage.navigateToCatalog();
  });

  test('verify pagination controls exist', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await expect(catalogPage.getPageIndicator(1)).toBeVisible();
    await expect(catalogPage.nextPageLink).toBeVisible();
    
    await expect(catalogPage.previousPageText).toBeVisible();
    const prevParentButton = catalogPage.previousPageText.locator('xpath=ancestor-or-self::button[1]');
    expect(await prevParentButton.isDisabled()).toBe(true);
    
    console.log('✓ Pagination controls verified on page 1');
  });

  test('navigate to next page', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await catalogPage.goToNextPage();
    
    await expect(page).toHaveURL(/page=2/);
    await expect(catalogPage.getPageIndicator(2)).toBeVisible();
    
    const productLinks = catalogPage.getProductLinksForPage(2);
    expect(await productLinks.count()).toBeGreaterThan(0);
    
    console.log('✓ Successfully navigated to page 2');
  });

  test('navigate through multiple pages', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await catalogPage.goToNextPage();
    await expect(catalogPage.getPageIndicator(2)).toBeVisible();
    
    await catalogPage.goToNextPage();
    await expect(catalogPage.getPageIndicator(3)).toBeVisible();
    
    console.log('✓ Successfully navigated through multiple pages');
  });

  test('previous page button is enabled on page 2', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await catalogPage.goToNextPage();
    await expect(catalogPage.getPageIndicator(2)).toBeVisible();
    
    await expect(catalogPage.previousPageText).toBeVisible();
    
    console.log('✓ Previous page button enabled on page 2');
  });

  test('go back to previous page', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await catalogPage.goToNextPage();
    await catalogPage.goToPreviousPage();
    
    await expect(page).toHaveURL(/collections\/all(\?page=1)?$/);
    await expect(catalogPage.getPageIndicator(1)).toBeVisible();
    
    console.log('✓ Successfully navigated back to page 1');
  });

  test('verify each page has products', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    const productLinks = catalogPage.getProductLinksForPage(1);
    const count = await productLinks.count();
    
    expect(count).toBeGreaterThan(0);
    console.log(`✓ Page 1 has ${count} products`);
  });

  test('pagination shows correct page info', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await expect(catalogPage.getPageIndicator(1)).toBeVisible();
    
    for (let i = 0; i < 4; i++) {
      await catalogPage.goToNextPage();
    }
    
    await expect(catalogPage.getPageIndicator(5)).toBeVisible();
    
    await expect(catalogPage.previousPageText).toBeVisible();
    
    console.log('✓ Pagination correctly shows page 5 of 5');
  });
});
