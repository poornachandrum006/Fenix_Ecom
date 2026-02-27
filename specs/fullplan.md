# Full shopping journey

## Application Overview

User visits the WearHumans e‑commerce site and completes a purchase of a product. The journey begins on the homepage and continues through product selection, cart review, checkout, and order submission.

## Test Scenarios

### 1. E2E Shopping Journey

**Seed:** `tests/seed.spec.ts`

#### 1.1. Complete purchase flow

**File:** `specs/fullplan.md`

**Steps:**
  1. Navigate to the homepage at https://wearhumans.com/
    - expect: Homepage should load with site logo, navigation links (Home, Catalog, Search, Log in, Cart) and a slideshow banner
  2. Click the "Catalog" link in the header
    - expect: The product listing page (/collections/all) loads showing filters, sort options and a grid of products
  3. Select the first product in the list (e.g. "Antique Drawers")
    - expect: Product detail page loads showing a product image, title, price, options (size), description, and Add to cart/Buy it now buttons
  4. Choose a valid option if applicable (e.g. Size = Medium) and click "Add to cart"
    - expect: A confirmation dialog appears with the added item details and the header cart indicator updates to show 1 item
  5. In the confirmation dialog, click "View cart (1 item)"
    - expect: Cart page loads with a table listing the selected item, quantity selector, subtotal, and a "Check out" button
  6. Review cart content (verify product name, price, quantity) and click "Check out"
    - expect: Checkout page opens with contact, delivery and payment sections; order summary shows line item and costs
  7. Fill contact information with a valid email/phone, opt‑in to newsletters if desired
    - expect: Contact information entered successfully and focus shifts to shipping section
  8. Enter shipping address details (Country, first/last name, address, city, state, ZIP)
    - expect: Shipping fields validate input; shipping methods become available
  9. Select a shipping method when displayed
    - expect: Shipping method is selected and cost reflects in the order summary
  10. Provide payment information using a test card number (e.g. 4111 1111 1111 1111, valid expiration and CVV)
    - expect: Payment fields accept input and the "Pay now" button becomes enabled
  11. Review the order summary details (item, quantity, subtotal, shipping, taxes, total)
    - expect: Summary matches entered data and pricing is correct
  12. Click "Pay now" or "Submit" to complete the purchase (using sandbox/test credentials)
    - expect: Order confirmation page or message is displayed indicating successful checkout
  13. Optionally, navigate back to homepage to confirm site navigation works after purchase
    - expect: Homepage loads correctly again
