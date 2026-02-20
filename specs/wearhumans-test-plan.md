# WearHumans — Comprehensive Test Plan (Merged)

## Overview

This single, consolidated test plan merges the existing test documents (homepage, PLP/PDP, and end‑to‑end user journey) into one authoritative source of test scenarios for WearHumans (Shopify).

- Base URL: `https://wearhumans.com`
- Canonical seed file: `tests/seed.spec.js` (used to set up base URL)
- Purpose: consolidate homepage, PLP, PDP and E2E scenarios; remove duplicates; provide file mappings for automation.

---

## Table of contents
1. Homepage
2. Product Listing Page (PLP)
3. Product Detail Page (PDP)
4. Catalog & Search
5. Cart & Checkout (E2E flows)
6. Cross‑cutting: Accessibility, Performance, Error handling, Responsive
7. Test data / Seeds
8. Execution notes & file mapping

---

## 1. Homepage

**Seed:** `tests/seed.spec.js`

### 1.1 Branding, navigation and hero
- Verify page title and branding: 'WearHumans - Spread Happiness with Humanly Face masks'
- Header contains links: Home, Catalog; icons: Search, Log in, Cart
- Hero slideshow displays expected headings and primary CTA (BUY NOW)
- Footer contains Quick links, Newsletter, Payment methods and 'Powered by Shopify'

Suggested spec files:
- `tests/homepage/layout-navigation.spec.ts`
- `tests/homepage/responsive-accessibility.spec.ts`

### 1.2 Search modal and search results
- Search modal opens/closes, input focused, Escape closes modal
- Search accepts valid queries, handles special characters, and shows results or 'no results' message
- Edge cases: empty search, very long query (500+ chars), input validation

Suggested spec files:
- `tests/homepage/search-modal.spec.ts`
- `tests/homepage/search-valid-queries.spec.ts`

### 1.3 Newsletter subscription
- Valid/invalid email validation, CAPTCHA handling (hCaptcha), accessibility of CAPTCHA
- Form prevents invalid submissions and shows appropriate messages

Suggested spec files:
- `tests/homepage/newsletter-subscription.spec.ts`

### 1.4 Product grid on homepage
- Product card elements (image, title, price), hover interactions, placeholder links validation
- Responsive behavior across desktop/tablet/mobile

Suggested spec files:
- `tests/homepage/product-grid.spec.ts`

---

## 2. Product Listing Page (PLP)

**Seed:** `tests/seed.spec.js`

### 2.1 PLP — Basic load & metadata
- Navigate to `/collections/all`; title should be 'Products – WearHumans'
- Product count text is visible and consistent with tiles

Suggested spec file: `tests/catalog/plp-load.spec.js`

### 2.2 PLP — Product card validation
- Each card: image, title, price, sale badge (when applicable), product link
- Tiles link to PDPs and show correct pricing format

Suggested spec file: `tests/catalog/plp-product-card.spec.js`

### 2.3 PLP — Filtering & Sort
- Filter by category (Antique), attribute (Color: Blue), clear filters
- Sort dropdown contains all expected options and ordering works (price asc/desc, alphabetical, date)

Suggested spec files:
- `tests/catalog/plp-filter-category.spec.js`
- `tests/catalog/plp-filter-color.spec.js`
- `tests/catalog/plp-sort-options.spec.js`
- `tests/catalog/plp-sort-price-asc.spec.js`

### 2.4 PLP — Pagination, empty state & accessibility
- Pagination next/previous, page indicators and URL params
- Empty state when filters produce 0 results
- Semantic roles, keyboard accessibility for filter/sort controls

Suggested spec files:
- `tests/catalog/plp-pagination.spec.js`
- `tests/catalog/plp-empty-state.spec.js`
- `tests/catalog/plp-accessibility.spec.js`

---

## 3. Product Detail Page (PDP)

**Seed:** `tests/seed.spec.js`

### 3.1 PDP — Basic display
- PDP URL contains `/products/` and shows title, gallery, price(s), description and 'Add to cart' / 'Buy it now'

Suggested spec file: `tests/catalog/pdp-load.spec.js`

### 3.2 PDP — Pricing, variants & availability
- Sale/regular price display, variant (size/color) selection, out‑of‑stock handling, quantity validation

Suggested spec files:
- `tests/catalog/pdp-pricing.spec.js`
- `tests/catalog/pdp-variants.spec.js`
- `tests/catalog/pdp-out-of-stock.spec.js`
- `tests/catalog/pdp-quantity.spec.js`

### 3.3 PDP — Actions and related content
- Add to cart confirmation, cart count update, 'Buy it now' -> checkout, related products section
- Social share buttons (Facebook/Twitter/Pinterest) open correct targets
- Image gallery thumbnails and zoom/lightbox behavior

Suggested spec files:
- `tests/catalog/pdp-add-to-cart.spec.js`
- `tests/catalog/pdp-buy-now.spec.js`
- `tests/catalog/pdp-related.spec.js`
- `tests/catalog/pdp-share.spec.js`
- `tests/catalog/pdp-gallery.spec.js`

---

## 4. Catalog & Search (cross-page)
- Verify combined behaviors: sorts, filters, pagination, search integration and persistence when navigating between PLP/PDP
- Ensure URLs reflect state (query params for filters, page, search)

Suggested spec files:
- `tests/e-commerce/catalog-navigation.spec.ts`
- `tests/homepage/search-valid-queries.spec.ts`

---

## 5. Cart & Checkout (E2E flows)

### 5.1 Complete purchase flow (happy path)
- Add product(s) to cart, verify cart contents, proceed to checkout, validate contact/shipping/payment sections and order summary

Suggested spec file:
- `tests/e-commerce/complete-purchase-flow.spec.ts`

### 5.2 Cart management and optional add-ons
- Modify quantities, remove items, verify optional services (shipping protection / carbon neutral)

Suggested spec file:
- `tests/e-commerce/cart-management.spec.ts`

### 5.3 Checkout form validation & security
- Required fields validation, address autocomplete, payment iframe security, express checkout options

Suggested spec file:
- `tests/e-commerce/checkout-validation.spec.ts`

---

## 6. Cross‑cutting concerns

### Accessibility
- Heading hierarchy, ARIA roles, keyboard navigation and focus order, alt text for images

### Performance
- Page load timings, progressive image loading, acceptable thresholds (example: < 3s full load)

### Error handling
- Network failures, third‑party script failures, graceful degradation without JS, console error monitoring

Suggested spec files:
- `tests/homepage/responsive-accessibility.spec.ts`
- `tests/homepage/performance.spec.ts`
- `tests/homepage/error-handling.spec.ts`

---

## 7. Test data & Seeds
- Canonical seed: `tests/seed.spec.js` — sets base URL and basic readiness checks
- Use deterministic test data when possible (stable product slugs, test SKUs, known in-stock variants)

---

## 8. Execution notes & mapping
- Run all tests: `npm test` (uses Playwright test runner)
- Run catalog tests only: `npm run test:catalog`
- Generate Allure report: `npm run report:allure`

File mapping (high level):
- Homepage: `tests/homepage/*`
- PLP / PDP: `tests/catalog/*`
- E2E / Checkout: `tests/e-commerce/*`

---

## Change log
- Merged `specs/wearhumans-homepage-test-plan.md`, `specs/plp-pdp-test-cases.md`, and previous `wearhumans-test-plan.md` into this consolidated document.
- Removed duplicates and normalized seed reference to `tests/seed.spec.js`.

---

*File saved: `specs/wearhumans-test-plan.md` — the single source of truth for test scenarios.*
