export class CatalogPage {
  constructor(page) {
    this.page = page;
  }

  // Navigation locators
  get catalogLink() {
    return this.page.getByRole('link', { name: 'Catalog' });
  }

  // Page elements
  get pageTitle() {
    return this.page.getByRole('heading', { name: /Collection: Products/ });
  }

  get productCountText() {
    return this.page.locator('text=75 products');
  }

  // Filter and sort locators
  get filterDropdown() {
    return this.page.locator('#FilterTags');
  }

  get sortDropdown() {
    return this.page.getByRole('combobox', { name: 'Sort by' });
  }

  // Pagination locators
  get pageIndicator() {
    return this.page.locator('[data-testid="pagination-info"], text=/Page \\d+ of \\d+/');
  }

  get nextPageLink() {
    return this.page.getByRole('link', { name: 'Next page' });
  }

  get previousPageText() {
    return this.page.locator('text=Previous page');
  }

  get previousPageButton() {
    // On page 1: disabled button, on other pages: enabled link
    return this.page.locator('button, a').filter({ hasText: 'Previous page' });
  }

  // Product locators
  get productLinks() {
    return this.page.getByRole('link').filter({ hasText: /Antique|Bangle|Bedside|Biodegradable/ });
  }

  get saleBadges() {
    return this.page.locator('text=Sale');
  }

  get salePriceElements() {
    return this.page.locator('text=Sale price');
  }

  get regularPriceElements() {
    return this.page.locator('text=Regular price');
  }

  // Specific product locators
  get antiqueDrawersLink() {
    return this.page.getByRole('link', { name: 'Antique Drawers' });
  }

  get bangleBraceletLink() {
    return this.page.getByRole('link', { name: 'Bangle Bracelet' });
  }

  get antiqueProducts() {
    return this.page.getByText('Antique');
  }

  get productGrid() {
    return this.page.locator('listitem');
  }

  // Navigation methods
  async navigateToCatalog() {
    await this.catalogLink.click();
  }

  async goToNextPage() {
    await this.nextPageLink.click();
    await this.page.waitForTimeout(3000);
  }

  async goToPreviousPage() {
    // Previous page can be either a disabled button (page 1) or an enabled link (other pages)
    const prevElement = this.page.locator('button, a').filter({ hasText: 'Previous page' });
    await prevElement.click();
    await this.page.waitForTimeout(3000);
  }

  // Filter methods
  async filterByCategory(category) {
    await this.filterDropdown.selectOption(category);
    await this.page.waitForTimeout(2000);
  }

  async clearFilter() {
    await this.filterDropdown.selectOption('All products');
    await this.page.waitForTimeout(2000);
  }

  // Sort methods
  async sortBy(sortOption) {
    await this.sortDropdown.selectOption(sortOption);
    await this.page.waitForTimeout(2000);
  }

  // Product interaction methods
  async clickProduct(productName) {
    const productLink = this.page.getByRole('link', { name: productName });
    await productLink.first().click();
  }

  async getProductCount() {
    return await this.productGrid.count();
  }

  // Page info methods
  getPageIndicator(pageNum) {
    return this.page.locator(`text=Page ${pageNum} of`, { hasText: new RegExp(`Page ${pageNum} of \\d+`) });
  }

  getProductLinksForPage(pageNum) {
    const productFilters = {
      1: /Antique|Bangle|Bedside|Black|Blue|Boho|Carbon|Chequered|Choker/,
      2: /CJ|Classic|Clay|Cream|Dainty|Dark|Dreamcatcher|Dummy|e-gift|Floral|Galaxy|Gardening|Gemstone|Gold/,
      'Z-A': /Zipped|Yellow|Wooden|White|Vanilla|TEST/,
      'newest': /Dummy|MIG-TEST|TEST|Migration|Bundle|New|product/,
      'default': /Boho|Choker|Classic|Antique|Gemstone/
    };

    const filter = productFilters[pageNum] || productFilters['default'];
    return this.page.getByRole('link').filter({ hasText: filter });
  }

  // Filter option getters
  async getFilterOptions() {
    const options = this.filterDropdown.locator('option');
    return await options.allTextContents();
  }

  async getSortOptions() {
    const options = this.sortDropdown.locator('option');
    return await options.allTextContents();
  }
}