# Allure Jenkins Integration Setup

## 🏗️ Jenkins Plugin Installation

### 1. Install Allure Plugin
1. Go to Jenkins Dashboard → **Manage Jenkins** → **Manage Plugins**
2. Go to **Available** tab
3. Search for "**Allure**"
4. Install "**Allure Jenkins Plugin**"
5. Restart Jenkins

### 2. Configure Allure Tool
1. Go to **Manage Jenkins** → **Global Tool Configuration**
2. Scroll to **Allure Commandline**
3. Click **Add Allure Commandline**
4. Configure:
   ```
   Name: allure
   Install automatically: ✓ Checked
   Version: Latest (e.g., 2.24.0)
   ```
5. **Save**

## 📊 Jenkins Job Configuration

### Option 1: Using Allure Plugin (Recommended)
Your Jenkinsfile automatically uses the Allure plugin:

```groovy
allure([
    includeProperties: false,
    jdk: '',
    properties: [],
    reportBuildPolicy: 'ALWAYS',
    results: [[path: 'allure-results']]
])
```

### Option 2: Manual Configuration (Freestyle Job)
If using Freestyle job instead of Pipeline:

1. **Build Steps**:
   - Add "Execute shell"
   - Command: `npx playwright test tests/catalog/ --reporter=allure-playwright`

2. **Post-build Actions**:
   - Add "Allure Report"
   - Results path: `allure-results`

## 🎯 Accessing Allure Reports

### After Build Completion:
1. **Via Allure Plugin**:
   - Go to build page → Click **"Allure Report"** link
   - Interactive dashboard with trends, charts, and detailed test results

2. **Via HTML Publisher** (Fallback):
   - Go to build page → Click **"Allure Test Report"** link
   - Static HTML report

### Report Features:
- 📈 **Test Trends** - Pass/Fail trends over time
- 📊 **Test Suites** - Organized by test files
- 🐛 **Failed Tests** - Detailed failure analysis
- 📸 **Screenshots** - On failure (if enabled)
- 🎥 **Videos** - Test execution recordings
- ⏱️ **Timing** - Test execution duration
- 📋 **Steps** - Detailed test steps

## 🔧 Troubleshooting

### Issue 1: "Allure plugin not available"
**Solution**: Install Allure Jenkins Plugin (see step 1 above)

### Issue 2: "No Allure results found"
**Solution**: Check that tests are running with `--reporter=allure-playwright`

### Issue 3: "Report generation failed"
**Solution**: 
```bash
# Verify allure-commandline is installed
npm list allure-commandline

# Install if missing
npm install --save-dev allure-commandline
```

### Issue 4: Empty report
**Solution**: Ensure test files generate results:
```bash
# Check allure-results directory
ls -la allure-results/
```

## 📈 Sample Report URLs

After successful build:
- **Main Dashboard**: `http://localhost:8080/job/Fenix_Ecommerce_Catalog_Tests/lastBuild/allure/`
- **Test Suites**: `http://localhost:8080/job/Fenix_Ecommerce_Catalog_Tests/lastBuild/allure/#suites`
- **Trends**: `http://localhost:8080/job/Fenix_Ecommerce_Catalog_Tests/allure/`

## ✅ Verification Steps

1. **Run a test build**
2. **Check console output** for:
   ```
   📈 Generating Allure report...
   ✅ Allure report generated successfully
   ✅ Allure plugin report published
   ```
3. **Click "Allure Report"** link in build page
4. **Verify report** shows test results with charts and details

Your Jenkins setup now includes comprehensive Allure reporting! 🎉