## Jenkins Setup Instructions for Fenix E-commerce Tests

### 📋 **Prerequisites**
- Jenkins running on localhost:8080
- Git plugin installed in Jenkins
- HTML Publisher plugin (for Allure reports)
- Node.js installed on Jenkins server

### 🚀 **Create New Pipeline Job**

1. **Open Jenkins Dashboard**: http://localhost:8080

2. **Create New Item**:
   - Click "New Item"
   - Enter job name: `Fenix_Ecommerce_Catalog_Tests`
   - Select "Pipeline"
   - Click "OK"

3. **Configure Pipeline**:
   ```
   Pipeline > Definition: Pipeline script from SCM
   SCM: Git
   Repository URL: https://github.com/poornachandrum006/Fenix_Ecom.git
   Branch: */main
   Script Path: Jenkinsfile
   ```   > Note: helper scripts (e.g. `setup-jenkins-env.sh`) now reside under `scripts/` in the repo.
4. **Add Parameters** (Build with Parameters):
   - Enable "This project is parameterized"
   - Add Choice Parameter:
     - Name: `TEST_SUITE`
     - Choices: `all`, `catalog`, `functional`, `visual`, `browse-products`, `filter-products`, `pagination`, `product-details`, `sort-products`, `e2e`, `search-and-buy`
   - Add Choice Parameter:
     - Name: `BROWSER`
     - Choices: `chromium`, `firefox`, `webkit`
   - Add Boolean Parameter:
     - Name: `HEADED`
     - Default: `false`

### 🎯 **Run Tests**

**Option 1: Use Jenkins UI**
1. Go to job page
2. Click "Build with Parameters"
3. Select your options:
   - TEST_SUITE: `all` (or specific test)
   - BROWSER: `chromium`
   - HEADED: `false`
4. Click "Build"

**Option 2: Quick Commands**
```bash
# Test all catalog tests
curl -X POST "http://localhost:8080/job/Fenix_Ecommerce_Catalog_Tests/buildWithParameters?TEST_SUITE=all&BROWSER=chromium&HEADED=false"

# Test only pagination
curl -X POST "http://localhost:8080/job/Fenix_Ecommerce_Catalog_Tests/buildWithParameters?TEST_SUITE=pagination&BROWSER=chromium&HEADED=false"
```

### 📊 **View Results**
- **Console Output**: Check build logs for test execution details
- **Allure Report**: Click on "Allure Test Report" link in build page
- **Artifacts**: Download test-results and allure-results from build artifacts

### 🔧 **Webhook Setup (Optional)**
To automatically trigger builds on Git push:

1. In Jenkins job configuration:
   - Build Triggers > "GitHub hook trigger for GITScm polling"

2. In GitHub repository:
   - Settings > Webhooks > Add webhook
   - Payload URL: `http://your-jenkins-url:8080/github-webhook/`
   - Content type: `application/json`
   - Events: `Push events`