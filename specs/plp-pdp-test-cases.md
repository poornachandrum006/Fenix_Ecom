# PLP & PDP — Comprehensive test plan

## Application Overview

Comprehensive test plan for Product Listing Page (PLP) and Product Detail Page (PDP) on WearHumans. Covers happy paths, sorting, filtering, pagination, product-card validations, PDP variants, cart interactions, social sharing, edge cases and negative scenarios. Seed: `tests/seed.spec.js`. Tests are independent and designed for Playwright automation.

## Test Scenarios

### 1. Catalog - Product Listing Page (PLP)

**Seed:** `tests/seed.spec.js`

#### 1.1. PLP - Load page and basic checks

**File:** `tests/catalog/plp-load.spec.js`

**Steps:**
  1. Navigate to homepage and click the 'Catalog' link
    - expect: URL contains '/collections/all'
    - expect: Page title contains 'Products'
    - expect: Product count text is visible

#### 1.2. PLP - Product card elements

**File:** `tests/catalog/plp-product-card.spec.js`

**Steps:**
  1. Open PLP and inspect the first product card
    - expect: Product image is visible
    - expect: Product title is visible
    - expect: Product price (sale or regular) is visible
    - expect: Sale badge is visible on discounted products (when applicable)
    - expect: Product card link navigates to product detail page

#### 1.3. PLP - Sort dropdown options exist

**File:** `tests/catalog/plp-sort-options.spec.js`

**Steps:**
  1. Open PLP and read all options from the 'Sort by' dropdown
    - expect: Contains 'Featured', 'Best selling', 'Alphabetically, A-Z', 'Alphabetically, Z-A', 'Price, low to high', 'Price, high to low', 'Date, old to new', 'Date, new to old'

#### 1.4. PLP - Sort functionality (Price: low to high)

**File:** `tests/catalog/plp-sort-price-asc.spec.js`

**Steps:**
  1. Select 'Price, low to high' from the sort dropdown
    - expect: Products are reordered by ascending price
    - expect: First visible product price is less than or equal to the second product price
    - expect: Product links remain valid

#### 1.5. PLP - Filter by category (Antique)

**File:** `tests/catalog/plp-filter-category.spec.js`

**Steps:**
  1. Open 'Filter by' and select 'Antique'
    - expect: URL updates or contains filter parameter for 'Antique'
    - expect: All visible products belong to the Antique category
    - expect: Product count is >= 0

#### 1.6. PLP - Filter by attribute (Color: Blue)

**File:** `tests/catalog/plp-filter-color.spec.js`

**Steps:**
  1. Open 'Filter by' and select 'Blue'
    - expect: URL contains color filter or query param
    - expect: Displayed products respect the selected color filter
    - expect: No unrelated categories shown

#### 1.7. PLP - Clear filters returns to all products

**File:** `tests/catalog/plp-clear-filters.spec.js`

**Steps:**
  1. Apply a filter (e.g., Antique) then clear filters
    - expect: Filter UI resets to 'All products'
    - expect: Product count reflects all products
    - expect: URL no longer contains filter query

#### 1.8. PLP - Pagination controls and navigation

**File:** `tests/catalog/plp-pagination.spec.js`

**Steps:**
  1. From PLP click 'Next page' then 'Previous page'
    - expect: URL contains page query (e.g., '?page=2') after navigating next
    - expect: Page indicator updates (Page 2 visible)
    - expect: Previous page button is enabled on page 2 and returns to page 1


#### 1.9. PLP - No results / empty state

**File:** `tests/catalog/plp-empty-state.spec.js`

**Steps:**
  1. Apply filters that produce zero results (use a filter combination unlikely to match)
    - expect: A user-friendly 'No products found' message is shown
    - expect: No product tiles are visible
    - expect: Clear/Reset option is available

#### 1.10. PLP - Accessibility and roles

**File:** `tests/catalog/plp-accessibility.spec.js`

**Steps:**
  1. Check PLP for primary ARIA roles and visible labels (headings, nav, list)
    - expect: Page has a visible main heading 'Collection' or similar
    - expect: Product list uses semantic list/role elements
    - expect: Filter and sort controls are accessible via keyboard/role

### 2. Product Detail Page (PDP)

**Seed:** `tests/seed.spec.js`

#### 2.1. PDP - Load from PLP and basic checks

**File:** `tests/catalog/pdp-load.spec.js`

**Steps:**
  1. From PLP click any product (e.g., 'Antique Drawers') to open PDP
    - expect: URL contains '/products/'
    - expect: Product title visible and matches clicked product
    - expect: Main product image visible
    - expect: Price(s) visible (sale/regular)

#### 2.2. PDP - Pricing & sale badge

**File:** `tests/catalog/pdp-pricing.spec.js`

**Steps:**
  1. Inspect price area on PDP for sale and regular price
    - expect: Sale price is shown when product is discounted
    - expect: Regular price is present (crossed out) when sale applies
    - expect: Currency and format are correct

#### 2.3. PDP - Variant selection (Size/Color)

**File:** `tests/catalog/pdp-variants.spec.js`

**Steps:**
  1. Change size/color variant from the PDP selectors
    - expect: Selected variant updates UI (selected label visible)
    - expect: Availability changes if variant is out of stock
    - expect: Price updates if variant has different price

#### 2.4. PDP - Add to cart flow

**File:** `tests/catalog/pdp-add-to-cart.spec.js`

**Steps:**
  1. Select required variant(s) and click 'Add to cart'
    - expect: 'Just added to your cart' confirmation/dialog appears
    - expect: Cart count increments or cart drawer shows added product
    - expect: Cart contains correct product name, variant and price

#### 2.5. PDP - Buy it now (checkout redirect)

**File:** `tests/catalog/pdp-buy-now.spec.js`

**Steps:**
  1. Click 'Buy it now' on PDP
    - expect: User is redirected to checkout URL (contains '/checkouts')
    - expect: Checkout page shows product summary and contact/delivery/payment sections

#### 2.6. PDP - Image gallery and zoom

**File:** `tests/catalog/pdp-gallery.spec.js`

**Steps:**
  1. Interact with product image thumbnails and zoom (if available)
    - expect: Clicking thumbnails updates main image
    - expect: Zoom or lightbox opens when main image is interacted with (if supported)
    - expect: Images load and are not broken

#### 2.7. PDP - Social sharing links

**File:** `tests/catalog/pdp-share.spec.js`

**Steps:**
  1. Click social share buttons (Facebook/Twitter/Pinterest)
    - expect: Share links open with correct target URL and parameters
    - expect: Buttons are visible and have accessible labels

#### 2.8. PDP - Related products section

**File:** `tests/catalog/pdp-related.spec.js`

**Steps:**
  1. Scroll to 'You may also like' or related products area
    - expect: Related products heading is visible
    - expect: At least one related product is listed with image, title and price
    - expect: Clicking a related product navigates to its PDP

#### 2.9. PDP - Out of stock / unavailable variant handling

**File:** `tests/catalog/pdp-out-of-stock.spec.js`

**Steps:**
  1. Select an out-of-stock variant (or mock if not present)
    - expect: 'Add to cart' button is disabled or shows 'Sold out'
    - expect: User sees an out-of-stock message or alternative suggestions

#### 2.10. PDP - Quantity selector and input validation

**File:** `tests/catalog/pdp-quantity.spec.js`

**Steps:**
  1. Change product quantity using the quantity input/controls and attempt to add to cart
    - expect: Quantity updates correctly
    - expect: Adding with quantity > available shows validation or caps at available stock
    - expect: Cart updates with correct quantity

#### 2.11. PDP - Navigation back to PLP

**File:** `tests/catalog/pdp-back-to-plp.spec.js`

**Steps:**
  1. From PDP click breadcrumb or 'Back to catalog' link
    - expect: User is returned to PLP (URL contains '/collections/all')
    - expect: PLP shows previous filters/sort state where applicable
