#!/bin/bash

# Jenkins Environment Setup for Playwright
# This script handles common Jenkins/CI environment issues

echo "🔧 Setting up Jenkins environment for Playwright..."

# Set CI environment variable
export CI=true
export PLAYWRIGHT_BROWSERS_PATH=0

# Set display for headless mode
export DISPLAY=:99

# Create virtual display if needed (for headed mode debugging)
if command -v Xvfb &> /dev/null; then
    echo "📺 Starting virtual display..."
    Xvfb :99 -screen 0 1280x720x24 > /dev/null 2>&1 &
    export XVFB_PID=$!
fi

# Jenkins workspace cleanup function
cleanup_jenkins() {
    if [ ! -z "$XVFB_PID" ]; then
        echo "🧹 Cleaning up virtual display..."
        kill $XVFB_PID 2>/dev/null || true
    fi
}

# Set trap for cleanup
trap cleanup_jenkins EXIT

echo "✅ Jenkins environment setup complete!"
echo "   CI: $CI"
echo "   PLAYWRIGHT_BROWSERS_PATH: $PLAYWRIGHT_BROWSERS_PATH"
echo "   DISPLAY: $DISPLAY"