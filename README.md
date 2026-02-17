# Playwright QA Framework (WearHumans)

Strict SDET-style Playwright JavaScript framework with Page Object Model (POM) and Allure reporting.

## Tech Stack
- Playwright (`@playwright/test`)
- JavaScript (CommonJS)
- Allure (`allure-playwright`, `allure-commandline`)

## Project Structure
- `tests/` → test specs only
- `pages/` → page objects only
- `utils/` → shared constants/helpers
- `allure-results/` → generated results

## Setup
1. Install dependencies:
   - `npm install`
2. Install Playwright browser:
   - `npx playwright install chromium`

## Run Tests
- `npm test`
- `npm run test:smoke`
- `npm run test:headed`
- `npm run test:ui`

## Allure Reporting
1. Generate report:
   - `npm run report:allure`
2. Open report:
   - `npm run report:open`

## Notes
- Base URL is configured as `https://wearhumans.com/` in `playwright.config.js`.
- Tests use `test.step()` for Allure-friendly reporting.
- Assertions are kept in specs; no assertions inside POM classes.
