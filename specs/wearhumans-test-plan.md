# WearHumans E-commerce User Journey Test Plan

## Application Overview

WearHumans.com is an e-commerce website that sells various products including face masks, furniture, accessories, and clothing items. The site features a modern Shopify-based interface with full shopping cart functionality, express checkout options, and secure payment processing. The test plan covers the complete user journey from product discovery through checkout.

## Test Scenarios

### 1. E-commerce User Journey

**Seed:** `tests/seed-wearhumans.spec.ts`

#### 1.1. Complete Purchase Flow - Happy Path

**File:** `tests/e-commerce/complete-purchase-flow.spec.ts`

**Steps:**
  1. Navigate to wearhumans.com homepage
    - expect: Page loads successfully
    - expect: Homepage displays with navigation menu
    - expect: Cart shows 0 items initially
    - expect: Catalog link is visible in navigation
  2. Click on 'Catalog' in the main navigation
    - expect: Redirected to /collections/all page
    - expect: Product grid displays with multiple products
    - expect: Filter and sort options are available
    - expect: Products show with images, names, and prices
  3. Click on the first product (Antique Drawers)
    - expect: Product detail page loads
    - expect: Product image, name, price, and description are displayed
    - expect: Size selector shows available options (Medium/Large)
    - expect: Add to cart button is visible and enabled
  4. Select product size (keep default Medium) and click 'Add to cart'
    - expect: Product is added to cart
    - expect: Modal popup appears saying 'Just added to your cart'
    - expect: Cart counter in header updates to show 1 item
    - expect: View cart link is available in the modal
  5. Click 'View cart' from the modal
    - expect: Cart page loads at /cart
    - expect: Product is listed in cart table with correct details
    - expect: Quantity shows as 1
    - expect: Price shows $250.00
    - expect: Subtotal displays correctly
    - expect: Check out button is visible
  6. Click 'Check out' button
    - expect: Checkout page loads with secure URL
    - expect: Contact section prompts for email/phone
    - expect: Delivery options show Ship/Pick up
    - expect: Shipping address form is displayed
    - expect: Payment section with credit card fields
    - expect: Order summary shows correct item and total ($272.50 including taxes)

#### 1.2. Product Catalog Navigation and Filtering

**File:** `tests/e-commerce/catalog-navigation.spec.ts`

**Steps:**
  1. Navigate to catalog page
    - expect: Catalog page loads with product grid
    - expect: Filter dropdown shows various categories
    - expect: Sort dropdown has multiple sorting options
    - expect: Pagination shows 'Page 1 of 5' indicating multiple pages
  2. Test filter functionality by selecting a product tag
    - expect: Products filter based on selected criteria
    - expect: Product count updates to reflect filtered results
    - expect: Clear filter option is available
  3. Test sorting functionality by changing sort order
    - expect: Products reorder based on selected sort criteria
    - expect: Sort options include price (low to high, high to low), alphabetical, date, featured
  4. Navigate to next page using pagination
    - expect: Page 2 loads with different products
    - expect: URL updates to include page parameter
    - expect: Previous page button becomes enabled

#### 1.3. Cart Management Operations

**File:** `tests/e-commerce/cart-management.spec.ts`

**Steps:**
  1. Add multiple products to cart from different pages
    - expect: Each product is successfully added
    - expect: Cart counter updates correctly
    - expect: Products maintain their selected options (size, variant)
  2. Access cart and modify quantities
    - expect: Quantity can be updated using spinbutton
    - expect: Prices recalculate automatically
    - expect: Subtotal updates to reflect changes
  3. Remove items from cart using Remove link
    - expect: Item is removed from cart
    - expect: Cart updates to show remaining items
    - expect: Empty cart state displays if all items removed
  4. Test additional cart features (shipping protection, carbon neutral options)
    - expect: Optional add-ons are available
    - expect: Prices update when optional services selected
    - expect: Service descriptions are clear and informative

#### 1.4. Checkout Process Validation

**File:** `tests/e-commerce/checkout-validation.spec.ts`

**Steps:**
  1. Proceed to checkout with items in cart
    - expect: Checkout page loads with all required sections
    - expect: Express checkout options available (payment gateways)
    - expect: Guest checkout and sign-in options present
  2. Test form validation by submitting empty required fields
    - expect: Appropriate error messages appear
    - expect: Required fields are clearly marked
    - expect: Form prevents submission until required data provided
  3. Fill out contact information with valid email
    - expect: Email validation works correctly
    - expect: Newsletter signup option available
    - expect: Sign-in link functions for existing customers
  4. Complete shipping address form
    - expect: Address autocomplete functionality works
    - expect: Country/state dropdowns populate correctly
    - expect: Zip code validation functions
    - expect: Save information checkbox available
  5. Select shipping method
    - expect: Shipping options display after address entry
    - expect: Shipping costs calculate and display
    - expect: Delivery timeframes shown
  6. Review payment form security features
    - expect: Credit card fields are in secure iframes
    - expect: Card type detection works
    - expect: Security code tooltip available
    - expect: SSL encryption indicators present

#### 1.5. Cross-browser and Responsive Design

**File:** `tests/e-commerce/responsive-design.spec.ts`

**Steps:**
  1. Test site functionality on mobile viewport
    - expect: Navigation collapses to mobile menu
    - expect: Product grid adapts to smaller screen
    - expect: Touch interactions work correctly
    - expect: Checkout form remains usable on mobile
  2. Verify functionality across different browsers
    - expect: Site works consistently in Chrome, Firefox, Safari
    - expect: Payment processing functions in all browsers
    - expect: CSS layouts render correctly
    - expect: JavaScript features function properly

#### 1.6. Performance and Error Handling

**File:** `tests/e-commerce/performance-errors.spec.ts`

**Steps:**
  1. Monitor page load times and performance
    - expect: Pages load within acceptable timeframes
    - expect: Images optimize and load progressively
    - expect: No console errors affect functionality
  2. Test error scenarios (network issues, invalid inputs)
    - expect: Graceful error handling with user-friendly messages
    - expect: Session persistence during temporary network issues
    - expect: Recovery mechanisms available
  3. Verify security features
    - expect: HTTPS enforced throughout checkout
    - expect: Payment data secured in iframes
    - expect: No sensitive data exposed in client-side code
