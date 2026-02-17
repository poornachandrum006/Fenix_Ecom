export class ProductDetailsPage {
  constructor(page) {
    this.page = page;
  }

  // Navigation locators
  get catalogLink() {
    return this.page.getByRole('link', { name: 'Catalog' });
  }

  // Product info locators
  get productHeading() {
    return this.page.getByRole('heading');
  }

  get productImage() {
    return this.page.locator('img[alt*=""]');
  }

  get saleBadge() {
    return this.page.locator('text=Sale').first();
  }

  get productDescription() {
    return this.page.locator('text=Antique wooden chest of drawers');
  }

  // Pricing locators
  get salePriceElement() {
    return this.page.locator('main').first().locator('[data-sale-price]').first();
  }

  get regularPriceElement() {
    return this.page.locator('main').first().locator('[data-regular-price]').last();
  }

  // Product options
  get sizeSelector() {
    return this.page.getByRole('combobox', { name: 'Size' });
  }

  // Action buttons
  get addToCartButton() {
    return this.page.getByRole('button', { name: 'Add to cart' });
  }

  get buyNowButton() {
    return this.page.getByRole('button', { name: 'Buy it now' });
  }

  // Social sharing links
  get facebookShareLink() {
    return this.page.getByRole('link', { name: /Share on Facebook/ });
  }

  get twitterShareLink() {
    return this.page.getByRole('link', { name: /Tweet on Twitter/ });
  }

  get pinterestShareLink() {
    return this.page.getByRole('link', { name: /Pin on Pinterest/ });
  }

  // Related products
  get relatedProductsHeading() {
    return this.page.getByRole('heading', { name: 'You may also like' });
  }

  get relatedProductsList() {
    return this.page.locator('.product-recommendations__inner ul.grid li');
  }

  // Product-specific methods
  getProductImage(altText) {
    return this.page.locator(`img[alt="${altText}"]`);
  }

  getProductHeading(productName) {
    return this.page.getByRole('heading', { name: productName });
  }

  async selectSize(size) {
    await this.sizeSelector.selectOption(size);
  }

  async navigateBackToCatalog() {
    await this.catalogLink.click();
  }

  async getSizeOptions() {
    const options = this.sizeSelector.locator('option');
    return await options.count();
  }

  async getSelectedSize() {
    return await this.sizeSelector.inputValue();
  }
}