# WearHumans Homepage Test Plan

## Application Overview

Comprehensive test plan for the WearHumans.com homepage, a Shopify-based e-commerce website selling face masks and various lifestyle products. The site features a modern design with hero slideshow, product catalog grid, search functionality, navigation, newsletter subscription, and cart functionality.

## Test Scenarios

### 1. Homepage Navigation and Layout

**Seed:** `tests/seed/homepage-setup.spec.ts`

#### 1.1. Homepage loads with correct branding and navigation

**File:** `tests/homepage/layout-navigation.spec.ts`

**Steps:**
  1. Navigate to https://wearhumans.com/
    - expect: Page loads successfully
    - expect: Page title is 'WearHumans - Spread Happiness with Humanly Face masks'
    - expect: Logo with text 'WearHumans' is visible
    - expect: Main navigation shows 'Home' and 'Catalog' links
    - expect: Header includes Search, Log in, and Cart icons
  2. Verify hero slideshow section
    - expect: Hero section displays 'Spread happiness' heading
    - expect: Subtext 'Humanly Faced Masks, Breathable Fabric' is visible
    - expect: BUY NOW button is present and functional
  3. Check product collection section
    - expect: Section heading 'our Mask collection' is displayed
    - expect: Product grid shows 15 product cards
    - expect: Each product card displays image, name, and price ($19.99)
    - expect: All product cards link to '#' (placeholder links)
  4. Verify footer content
    - expect: Quick links section with Search link
    - expect: Newsletter subscription form
    - expect: Payment methods icons (American Express, Apple Pay, Diners Club, Discover, Google Pay, Mastercard, Visa)
    - expect: Copyright '© 2026, WearHumans' and 'Powered by Shopify' links

#### 1.2. Navigation links functionality

**File:** `tests/homepage/navigation-links.spec.ts`

**Steps:**
  1. Click on the WearHumans logo
    - expect: Page remains on homepage
    - expect: URL stays at https://wearhumans.com/
  2. Click on 'Home' navigation link
    - expect: Page remains on homepage
    - expect: URL stays at https://wearhumans.com/
  3. Click on 'Catalog' navigation link
    - expect: Page navigates to product catalog
    - expect: URL changes to /collections/all
    - expect: Page title changes to 'Products – WearHumans'
  4. Navigate back and click 'BUY NOW' button
    - expect: Page navigates to product catalog
    - expect: URL changes to /collections/all
    - expect: Same catalog page loads as with Catalog link

#### 1.3. Responsive design and accessibility

**File:** `tests/homepage/responsive-accessibility.spec.ts`

**Steps:**
  1. Test skip to content link
    - expect: Skip to content link is present at top of page
    - expect: Link points to #MainContent anchor
  2. Verify aria-live regions and headings
    - expect: Page has proper heading hierarchy (h1 for logo, h2 for sections)
    - expect: Product collection uses proper list structure
    - expect: Payment methods section has proper labeling
  3. Check keyboard navigation
    - expect: All interactive elements are focusable via keyboard
    - expect: Tab order is logical (logo -> nav -> search -> login -> cart -> hero CTA -> products)
    - expect: Visual focus indicators are present

### 2. Search Functionality

**Seed:** `tests/seed/homepage-setup.spec.ts`

#### 2.1. Search modal opens and closes properly

**File:** `tests/homepage/search-modal.spec.ts`

**Steps:**
  1. Click the Search button in header
    - expect: Search modal dialog opens
    - expect: Search input field is focused
    - expect: Submit button and Close button are visible
    - expect: Background content is dimmed/modal overlay present
  2. Click 'Close search' button
    - expect: Search modal closes
    - expect: Focus returns to search button
    - expect: Page content is fully visible again
  3. Open search modal and press Escape key
    - expect: Search modal closes
    - expect: Focus returns to search button

#### 2.2. Search functionality with valid queries

**File:** `tests/homepage/search-valid-queries.spec.ts`

**Steps:**
  1. Search for 'mask' and submit
    - expect: Navigates to search results page
    - expect: URL contains '/search?q=mask'
    - expect: Page shows 'Search results: 0 results for "mask"'
    - expect: Displays suggestion to check spelling or try different words
  2. Search for 'product' and submit
    - expect: Navigates to search results page
    - expect: Shows appropriate search results or no results message
    - expect: Search term remains in search box on results page
  3. Search with special characters '!@#$' and submit
    - expect: Search handles special characters gracefully
    - expect: No JavaScript errors occur
    - expect: Results page loads properly

#### 2.3. Search edge cases and validation

**File:** `tests/homepage/search-edge-cases.spec.ts`

**Steps:**
  1. Submit empty search query
    - expect: Search handles empty input appropriately
    - expect: No error occurs
    - expect: User gets feedback or redirected properly
  2. Search with very long query (500+ characters)
    - expect: Long search terms are handled properly
    - expect: No system errors occur
    - expect: URL encoding works correctly
  3. Test search input validation
    - expect: Search input accepts all standard keyboard characters
    - expect: Copy/paste functionality works
    - expect: Input field shows proper placeholder text

### 3. User Account and Cart

**Seed:** `tests/seed/homepage-setup.spec.ts`

#### 3.1. Cart access and empty state

**File:** `tests/homepage/cart-empty-state.spec.ts`

**Steps:**
  1. Click Cart icon in header
    - expect: Navigates to cart page
    - expect: URL changes to /cart
    - expect: Page title is 'Your Shopping Cart – WearHumans'
    - expect: Shows 'Your cart' heading and 'Your cart is currently empty' message
  2. Click 'Continue shopping' link
    - expect: Navigates back to homepage
    - expect: URL returns to https://wearhumans.com/
    - expect: All homepage content loads properly

#### 3.2. Login functionality access

**File:** `tests/homepage/login-access.spec.ts`

**Steps:**
  1. Click 'Log in' link in header
    - expect: Redirects to customer authentication page
    - expect: URL points to customer_authentication/redirect
    - expect: Includes proper locale and region parameters (en, IN)
    - expect: Page loads without errors

### 4. Newsletter Subscription

**Seed:** `tests/seed/homepage-setup.spec.ts`

#### 4.1. Newsletter form validation and submission

**File:** `tests/homepage/newsletter-subscription.spec.ts`

**Steps:**
  1. Enter valid email 'test@example.com' and click Subscribe
    - expect: Email is accepted in the input field
    - expect: CAPTCHA challenge appears (hCaptcha)
    - expect: Form submission process initiates
    - expect: No immediate JavaScript errors occur
  2. Try submitting newsletter form with invalid email 'invalid-email'
    - expect: Form validates email format
    - expect: Appropriate error message displays
    - expect: Form does not submit with invalid email
  3. Submit empty newsletter form
    - expect: Form requires email input
    - expect: Validation message appears
    - expect: Form prevents submission without email

#### 4.2. CAPTCHA integration testing

**File:** `tests/homepage/newsletter-captcha.spec.ts`

**Steps:**
  1. Complete newsletter form and encounter CAPTCHA
    - expect: hCaptcha widget loads properly
    - expect: CAPTCHA challenge displays correctly
    - expect: Accessibility options are available
    - expect: Language selection (EN) is available
    - expect: Refresh option is present
  2. Test CAPTCHA accessibility features
    - expect: Audio challenge option available
    - expect: Text challenge option available
    - expect: Proper ARIA labels for accessibility
    - expect: Keyboard navigation works in CAPTCHA

### 5. Product Grid and Interactions

**Seed:** `tests/seed/homepage-setup.spec.ts`

#### 5.1. Product cards display and interaction

**File:** `tests/homepage/product-grid.spec.ts`

**Steps:**
  1. Verify all product cards in homepage collection
    - expect: 15 product cards are displayed
    - expect: Each card shows product image
    - expect: Each card displays 'Your product's name' title
    - expect: Each card shows 'Regular price $19.99'
    - expect: All cards use consistent styling
  2. Test product card hover interactions
    - expect: Cards respond to hover with visual feedback
    - expect: Images load properly on hover
    - expect: Price information remains visible
    - expect: Cards maintain layout integrity
  3. Click on product cards
    - expect: Product cards are clickable
    - expect: Links point to '#' (placeholder URLs)
    - expect: Click interaction provides visual feedback
    - expect: Page layout remains stable after clicks

#### 5.2. Product grid layout and responsiveness

**File:** `tests/homepage/product-grid-responsive.spec.ts`

**Steps:**
  1. Test product grid on desktop viewport (1920x1080)
    - expect: Products display in optimal grid layout
    - expect: All 15 products are visible
    - expect: Grid maintains proper spacing
    - expect: Images load at appropriate resolution
  2. Test product grid on tablet viewport (768x1024)
    - expect: Grid adapts to tablet screen size
    - expect: Products remain accessible and readable
    - expect: Touch interactions work properly
    - expect: Layout maintains visual hierarchy
  3. Test product grid on mobile viewport (375x667)
    - expect: Grid stacks appropriately for mobile
    - expect: Products remain fully functional
    - expect: Touch targets meet minimum size requirements
    - expect: Horizontal scrolling is avoided

### 6. Performance and Error Handling

**Seed:** `tests/seed/homepage-setup.spec.ts`

#### 6.1. Page load performance

**File:** `tests/homepage/performance.spec.ts`

**Steps:**
  1. Measure homepage load time
    - expect: Page loads within 3 seconds
    - expect: Images load progressively
    - expect: Critical content appears within 1 second
    - expect: No blocking resources delay page interaction
  2. Test with slow network connection
    - expect: Page remains functional on slow connections
    - expect: Loading states are shown appropriately
    - expect: Content degrades gracefully
    - expect: Core functionality works without all assets loaded

#### 6.2. Error handling and edge cases

**File:** `tests/homepage/error-handling.spec.ts`

**Steps:**
  1. Test behavior with JavaScript disabled
    - expect: Basic navigation still works
    - expect: Forms submit via standard HTTP
    - expect: Critical content remains accessible
    - expect: Graceful degradation maintains core functionality
  2. Monitor console for JavaScript errors
    - expect: No critical JavaScript errors occur
    - expect: Network timeouts are handled gracefully
    - expect: Third-party script failures don't break core functionality
    - expect: Error logging works properly
  3. Test with ad blockers and privacy extensions
    - expect: Core functionality works with ad blockers
    - expect: Analytics blocking doesn't break features
    - expect: Payment method icons display correctly
    - expect: Newsletter signup works without tracking scripts
