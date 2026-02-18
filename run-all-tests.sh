#!/bin/bash

# Script to run all Playwright tests for Fenix E-commerce project
# Usage: ./run-all-tests.sh [browser] [headed]

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Default values
BROWSER=${1:-chromium}
HEADED_FLAG=""

# Check if headed mode is requested
if [ "$2" == "headed" ]; then
    HEADED_FLAG="--headed"
    echo -e "${YELLOW}🖥️  Running tests in headed mode${NC}"
fi

echo -e "${BLUE}🚀 Starting Fenix E-commerce Test Suite${NC}"
echo -e "${BLUE}====================================${NC}"
echo -e "${BLUE}Browser: ${BROWSER}${NC}"
echo -e "${BLUE}Mode: ${2:-headless}${NC}"
echo ""

# Function to run a specific test suite
run_test_suite() {
    local suite_name=$1
    local test_path=$2
    local emoji=$3
    
    echo -e "${PURPLE}${emoji} Running ${suite_name} tests...${NC}"
    echo -e "${PURPLE}================================================${NC}"
    
    if npx playwright test "${test_path}" --project="${BROWSER}" ${HEADED_FLAG} --reporter=line,allure-playwright; then
        echo -e "${GREEN}✅ ${suite_name} tests PASSED${NC}"
        return 0
    else
        echo -e "${RED}❌ ${suite_name} tests FAILED${NC}"
        return 1
    fi
}

# Track test results
FAILED_SUITES=()
PASSED_SUITES=()

echo -e "${YELLOW}🧹 Cleaning previous results...${NC}"
rm -rf allure-results allure-report test-results 2>/dev/null || true
mkdir -p allure-results

echo ""

# Run Catalog Tests
if run_test_suite "Catalog" "tests/catalog/" "🛒"; then
    PASSED_SUITES+=("Catalog")
else
    FAILED_SUITES+=("Catalog")
fi

echo ""

# Run Functional Tests
if run_test_suite "Functional" "tests/Functional/" "🔧"; then
    PASSED_SUITES+=("Functional")
else
    FAILED_SUITES+=("Functional")
fi

echo ""

# Run Visual Tests
if run_test_suite "Visual" "tests/visual/" "👁️"; then
    PASSED_SUITES+=("Visual")
else
    FAILED_SUITES+=("Visual")
fi

echo ""

# Run Seed Tests (if exists)
if [ -f "tests/seed.spec.js" ]; then
    if run_test_suite "Seed" "tests/seed.spec.js" "🌱"; then
        PASSED_SUITES+=("Seed")
    else
        FAILED_SUITES+=("Seed")
    fi
    echo ""
fi

# Generate Allure Report
echo -e "${BLUE}📊 Generating Allure report...${NC}"
if npm run report:allure 2>/dev/null || npx allure generate allure-results --clean -o allure-report 2>/dev/null; then
    echo -e "${GREEN}✅ Allure report generated successfully${NC}"
    echo -e "${BLUE}📋 Open allure-report/index.html to view detailed results${NC}"
else
    echo -e "${YELLOW}⚠️ Could not generate Allure report${NC}"
fi

echo ""
echo -e "${BLUE}📈 Test Summary${NC}"
echo -e "${BLUE}=================${NC}"
echo -e "${GREEN}✅ Passed Suites (${#PASSED_SUITES[@]}): ${PASSED_SUITES[*]}${NC}"
echo -e "${RED}❌ Failed Suites (${#FAILED_SUITES[@]}): ${FAILED_SUITES[*]}${NC}"

# Exit with appropriate code
if [ ${#FAILED_SUITES[@]} -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 ALL TESTS PASSED! 🎉${NC}"
    exit 0
else
    echo ""
    echo -e "${RED}💥 Some tests failed. Check the logs above for details.${NC}"
    exit 1
fi