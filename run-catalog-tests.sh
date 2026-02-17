#!/bin/bash

# Catalog Test Runner for Jenkins
# Usage: ./run-catalog-tests.sh [test-suite] [browser] [headed]

set -e

TEST_SUITE=${1:-"all"}
BROWSER=${2:-"chromium"}
HEADED=${3:-"false"}

echo "🚀 Starting Catalog Tests..."
echo "📊 Test Suite: $TEST_SUITE"
echo "🌐 Browser: $BROWSER"
echo "👁️  Headed Mode: $HEADED"

# Setup
echo "🧹 Cleaning previous test results..."
rm -rf allure-results allure-report || echo "No previous results to clean"
mkdir -p allure-results

echo "📦 Installing dependencies..."
npm install

echo "🎭 Installing Playwright browsers..."
npx playwright install $BROWSER

# Build test command
TEST_CMD="npx playwright test"
REPORTER="--reporter=line,allure-playwright"
BROWSER_FLAG="--project=$BROWSER"
HEADED_FLAG=""

if [ "$HEADED" = "true" ]; then
    HEADED_FLAG="--headed"
fi

# Run specific test suite
case $TEST_SUITE in
    "all")
        TEST_PATH="tests/catalog/"
        ;;
    "browse-products")
        TEST_PATH="tests/catalog/browse-products.spec.js"
        ;;
    "filter-products")
        TEST_PATH="tests/catalog/filter-products.spec.js"
        ;;
    "pagination")
        TEST_PATH="tests/catalog/pagination.spec.js"
        ;;
    "product-details")
        TEST_PATH="tests/catalog/product-details.spec.js"
        ;;
    "sort-products")
        TEST_PATH="tests/catalog/sort-products.spec.js"
        ;;
    *)
        echo "❌ Unknown test suite: $TEST_SUITE"
        echo "Available options: all, browse-products, filter-products, pagination, product-details, sort-products"
        exit 1
        ;;
esac

# Execute tests
FULL_COMMAND="$TEST_CMD $TEST_PATH $REPORTER $BROWSER_FLAG $HEADED_FLAG"
echo "🏃 Running: $FULL_COMMAND"

$FULL_COMMAND

# Generate reports
echo "📈 Generating Allure report..."
npm run report:allure || echo "⚠️ Allure report generation failed"

echo "✅ Catalog tests completed!"