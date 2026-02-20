# Jenkins Global Tools Configuration

This guide explains how to configure Jenkins Global Tool Configuration for optimal Playwright test execution with improved caching and dependency management.

## Overview

Option 3: Jenkins Global Tool Configuration provides:
- **Centralized Node.js Management**: Single Node.js installation across all jobs
- **Browser Caching**: Persistent browser storage between builds
- **Faster Builds**: Reuse cached dependencies and browsers
- **Better Resource Management**: Optimized memory and disk usage

## Jenkins Global Tool Configuration Setup

### 1. Configure Node.js Global Tool

1. Navigate to **Jenkins Dashboard** → **Manage Jenkins** → **Global Tool Configuration**
2. Find the **NodeJS** section
3. Click **Add NodeJS**
4. Configure:
   - **Name**: `18.20.4` (must match the name in Jenkinsfile)
   - **Install automatically**: ✅ Checked
   - **Version**: `NodeJS 18.20.4`
   - **Global npm packages to install**: `playwright` (optional, for global installation)

### 2. Install Required Jenkins Plugins

Ensure these plugins are installed:
```bash
# Core plugins for this setup
- NodeJS Plugin
- Git Plugin
- Pipeline Plugin
- Allure Plugin (if using Allure reporting)
```

Install via **Manage Jenkins** → **Manage Plugins** → **Available**

## Caching Strategy

### Browser Caching
```groovy
PLAYWRIGHT_BROWSERS_PATH = "${env.WORKSPACE}/.playwright-browsers"
```
- Browsers are cached in workspace directory
- Shared across builds on the same agent
- Automatic cleanup when workspace is wiped

### NPM Cache
```groovy
NPM_CONFIG_CACHE = "${env.WORKSPACE}/.npm-cache"
```
- npm packages cached locally
- Faster subsequent installs
- Reduced network usage

## Pipeline Features

### 1. Automatic Browser Detection
```groovy
// Check if browser is already installed
def browserInstalled = sh(
    script: "npx playwright install --dry-run ${browser} | grep 'is already installed'",
    returnStdout: true
).trim()
```

### 2. Smart Browser Installation
- Only downloads browsers if not already cached
- Skips installation for existing browsers
- Verification step ensures browser integrity

### 3. Environment Optimization
- Jenkins-specific configuration
- Snap compatibility for Ubuntu-based Jenkins
- Automatic Firefox fallback for Chromium issues

## Build Performance Improvements

| Feature | Without Global Tools | With Global Tools |
|---------|---------------------|-------------------|
| Node.js Setup | ~30-60 seconds | ~5-10 seconds |
| Browser Download | ~1-3 minutes | ~10-30 seconds* |
| npm install | ~30-90 seconds | ~10-30 seconds |
| Total Build Time | ~3-6 minutes | ~1-2 minutes |

*Browser download time reduced significantly after first build

## Monitoring and Maintenance

### Check Cache Status
Add this to your pipeline for monitoring:
```groovy
echo "Browser cache directory: ${env.PLAYWRIGHT_BROWSERS_PATH}"
sh 'ls -la "${PLAYWRIGHT_BROWSERS_PATH}" || echo "Browser cache empty"'
```

### Cache Management
- **Automatic**: Jenkins workspace cleanup removes old caches
- **Manual**: Delete `.playwright-browsers` and `.npm-cache` directories
- **Optimization**: Consider using shared storage for multiple agents

## Troubleshooting

### Common Issues

1. **Node.js Tool Not Found**
   ```
   ERROR: Tool 'nodejs' not configured in Global Tool Configuration
   ```
   **Solution**: Verify the tool name in Global Tool Configuration matches Jenkinsfile

2. **Browser Cache Permissions**
   ```
   ERROR: Cannot write to browser cache directory
   ```
   **Solution**: Ensure Jenkins user has write permissions to workspace

3. **Stale Browser Cache**
   ```
   ERROR: Browser installed but not working
   ```
   **Solution**: Clear browser cache directory and reinstall

### Verification Commands
```bash
# Check Node.js version from global tool
node --version

# Verify Playwright installation
npx playwright --version

# Check browser status
npx playwright install --dry-run chromium
npx playwright install --dry-run firefox
```

## Migration from Previous Setup

To migrate from basic Jenkins setup to Global Tools:

1. **Update Jenkinsfile**: Use the new version with `tools` block
2. **Configure Global Tools**: Set up Node.js as described above
3. **Test Pipeline**: Run a test build to verify functionality
4. **Monitor Performance**: Check build time improvements

## Best Practices

### 1. Tool Naming
- Use specific versions in tool names (e.g., `18.20.4`)
- Match exactly between Jenkins config and Jenkinsfile

### 2. Cache Management
- Monitor disk usage for cache directories
- Set up periodic cleanup if needed
- Consider shared cache for multiple agents

### 3. Browser Strategy
- Use Firefox for better Jenkins compatibility
- Keep Chromium as backup option
- Test both browsers in your environment

### 4. Environment Variables
- Use workspace-relative paths for caching
- Set appropriate permissions for cache directories
- Monitor environment variable usage

## Advanced Configuration

### Multiple Node.js Versions
Configure multiple Node.js versions for different projects:
```groovy
tools {
    nodejs '16.20.2'  // For legacy projects
    nodejs '18.20.4'  // For current projects
    nodejs '20.10.0'  // For experimental projects
}
```

### Shared Browser Cache (Multi-Agent)
For Jenkins with multiple agents, consider shared storage:
```groovy
environment {
    PLAYWRIGHT_BROWSERS_PATH = "/shared/jenkins-cache/playwright-browsers"
}
```

### Pipeline Library Integration
Create shared library functions for browser management:
```groovy
@Library('your-pipeline-lib') _

pipeline {
    agent any
    tools {
        nodejs playwrightNodeVersion()
    }
    // ... rest of pipeline
}
```

## Performance Monitoring

Track these metrics to measure improvement:
- **Build Duration**: Total pipeline execution time
- **Browser Install Time**: Time spent downloading browsers
- **Dependency Install Time**: npm/yarn installation duration
- **Cache Hit Rate**: Percentage of builds using cached browsers
- **Disk Usage**: Cache directory size growth

Use Jenkins Build Time Trend Plugin to visualize improvements over time.