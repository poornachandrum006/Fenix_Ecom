import { test, expect } from '@playwright/test';
import { CatalogPage } from '../../pages/catalog_page.js';
import { ProductDetailsPage } from '../../pages/product_details_page.js';

const BASE_URL = 'https://wearhumans.com';

test.describe('Catalog - Product Details', () => {
  test('view product details page', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await catalogPage.navigateToCatalog();
    
    await catalogPage.clickProduct('Antique Drawers');
    await expect(page).toHaveURL(/\/products\/antique-drawers/);
    
    await expect(page.getByRole('heading', { name: 'Antique Drawers' })).toBeVisible();
    
    console.log('✓ Product details page loaded');
  });

  test('product page shows product image', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    
    await page.goto(`${BASE_URL}/products/antique-drawers`, { waitUntil: 'domcontentloaded' });
    
    const productImage = productDetailsPage.getProductImage('Antique Drawers');
    await expect(productImage).toBeVisible();
    
    console.log('✓ Product image displayed');
  });

  test('product page shows pricing', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    
    await page.goto(`${BASE_URL}/products/antique-drawers`, { waitUntil: 'domcontentloaded' });
    
    await expect(productDetailsPage.salePriceElement).toBeVisible();
    await expect(productDetailsPage.regularPriceElement).toBeVisible();
    
    console.log('✓ Product pricing displayed (Sale: $250.00, Regular: $300.00)');
  });

  test('product page shows sale badge', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    
    await page.goto(`${BASE_URL}/products/antique-drawers`, { waitUntil: 'domcontentloaded' });
    
    await expect(productDetailsPage.saleBadge).toBeVisible();
    
    console.log('✓ Sale badge displayed on product');
  });

  test('product page shows product description', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    
    await page.goto(`${BASE_URL}/products/antique-drawers`, { waitUntil: 'domcontentloaded' });
    
    await expect(productDetailsPage.productDescription).toBeVisible();
    
    console.log('✓ Product description displayed');
  });

  test('product page shows size options', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    
    await page.goto(`${BASE_URL}/products/antique-drawers`, { waitUntil: 'domcontentloaded' });
    
    await expect(productDetailsPage.sizeSelector).toBeVisible();
    
    const optionCount = await productDetailsPage.getSizeOptions();
    expect(optionCount).toBeGreaterThan(0);
    
    console.log('✓ Size options displayed');
  });

  test('product page shows add to cart button', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    
    await page.goto(`${BASE_URL}/products/antique-drawers`, { waitUntil: 'domcontentloaded' });
    
    await expect(productDetailsPage.addToCartButton).toBeVisible();
    await expect(productDetailsPage.addToCartButton).toBeEnabled();
    
    console.log('✓ Add to cart button available');
  });

  test('product page shows buy now button', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    
    await page.goto(`${BASE_URL}/products/antique-drawers`, { waitUntil: 'domcontentloaded' });
    
    await expect(productDetailsPage.buyNowButton).toBeVisible();
    await expect(productDetailsPage.buyNowButton).toBeEnabled();
    
    console.log('✓ Buy it now button available');
  });

  test('product page shows social sharing options', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    
    await page.goto(`${BASE_URL}/products/antique-drawers`, { waitUntil: 'domcontentloaded' });
    
    await expect(productDetailsPage.facebookShareLink).toBeVisible();
    await expect(productDetailsPage.twitterShareLink).toBeVisible();
    await expect(productDetailsPage.pinterestShareLink).toBeVisible();
    
    console.log('✓ Social sharing options displayed (Facebook, Twitter, Pinterest)');
  });

  test('product page shows related products', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    
    await page.goto(`${BASE_URL}/products/antique-drawers`, { waitUntil: 'domcontentloaded' });
    
    await expect(productDetailsPage.relatedProductsHeading).toBeVisible();
    
    expect(await productDetailsPage.relatedProductsList.count()).toBeGreaterThan(0);
    
    console.log('✓ Related products section displayed');
  });

  test('select different product size variant', async ({ page }) => {
    const productDetailsPage = new ProductDetailsPage(page);
    
    await page.goto(`${BASE_URL}/products/antique-drawers`, { waitUntil: 'domcontentloaded' });
    
    await productDetailsPage.selectSize('LARGE');
    
    const selectedOption = await productDetailsPage.getSelectedSize();
    expect(selectedOption).toContain('LARGE');
    
    console.log('✓ Product size variant changed to LARGE');
  });

  test('navigate back to catalog from product page', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    
    await page.goto(`${BASE_URL}/products/antique-drawers`, { waitUntil: 'domcontentloaded' });
    
    await productDetailsPage.navigateBackToCatalog();
    await expect(page).toHaveURL(/collections\/all/);
    
    await expect(catalogPage.productCountText).toBeVisible();
    
    console.log('✓ Navigated back to catalog from product page');
  });

  test('view another product from catalog', async ({ page }) => {
    const catalogPage = new CatalogPage(page);
    
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    await catalogPage.navigateToCatalog();
    
    await catalogPage.clickProduct('Bangle Bracelet');
    await expect(page).toHaveURL(/\/products\/bangle-bracelet/);
    
    await expect(page.getByRole('heading', { name: 'Bangle Bracelet' })).toBeVisible();
    
    console.log('✓ Successfully viewed different product');
  });
});
