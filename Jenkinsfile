pipeline {
    agent any
    
    parameters {
        choice(
            name: 'TEST_SUITE',
            choices: ['all', 'browse-products', 'filter-products', 'pagination', 'product-details', 'sort-products'],
            description: 'Which test suite to run'
        )
        choice(
            name: 'BROWSER',
            choices: ['chromium', 'firefox', 'webkit'],
            description: 'Browser to run tests on'
        )
        booleanParam(
            name: 'HEADED',
            defaultValue: false,
            description: 'Run tests in headed mode'
        )
        string(
            name: 'BRANCH',
            defaultValue: 'main',
            description: 'Git branch to checkout'
        )
    }
    
    environment {
        NODE_VERSION = '18'
        ALLURE_RESULTS_PATH = 'allure-results'
        ALLURE_REPORT_PATH = 'allure-report'
        PLAYWRIGHT_BROWSERS_PATH = '0'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo "🔄 Checking out branch: ${params.BRANCH}"
                git branch: "${params.BRANCH}", url: 'https://github.com/poornachandrum006/Fenix_Ecom.git'
            }
        }
        
        stage('Environment Info') {
            steps {
                echo '🔍 Environment Information:'
                sh 'node --version || echo "Node.js not found"'
                sh 'npm --version || echo "npm not found"'
                sh 'pwd && ls -la'
                
                // Set up Jenkins-specific environment
                sh 'chmod +x setup-jenkins-env.sh'
                sh '. ./setup-jenkins-env.sh'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                
                script {
                    // Install system dependencies for Playwright
                    try {
                        sh '''
                            # Install system dependencies
                            sudo apt-get update || echo "Could not update apt cache"
                            sudo apt-get install -y \
                                libnss3 \
                                libnspr4 \
                                libdbus-1-3 \
                                libatk1.0-0 \
                                libatk-bridge2.0-0 \
                                libcups2 \
                                libdrm2 \
                                libgtk-3-0 \
                                libgbm1 \
                                libasound2 \
                                libxss1 \
                                libxcomposite1 \
                                libxdamage1 \
                                libxrandr2 \
                                libxkbcommon0 \
                                libatspi2.0-0 \
                                libxshmfence1 \
                                fonts-liberation \
                                libappindicator3-1 \
                                xdg-utils || echo "Some system packages could not be installed"
                        '''
                    } catch (Exception e) {
                        echo "⚠️ Could not install system dependencies: ${e.getMessage()}"
                    }
                }
                
                sh 'npm ci || npm install'
                
                script {
                    // For Jenkins environment, prefer Firefox over Chromium due to snap issues
                    def browser = params.BROWSER
                    if (env.JENKINS_URL && browser == 'chromium') {
                        echo "🔄 Jenkins environment detected, switching to Firefox for better compatibility"
                        browser = 'firefox'
                        env.JENKINS_BROWSER = 'firefox'
                    }
                    
                    sh "npx playwright install ${browser}"
                    sh "npx playwright install-deps ${browser} || echo 'Could not install browser deps'"
                }
            }
        }
        
        stage('Run Catalog Tests') {
            steps {
                script {
                    def testCommand = "npx playwright test"
                    def reporterOptions = "--reporter=line,allure-playwright"
                    
                    // Use Firefox in Jenkins environment for better compatibility
                    def browser = env.JENKINS_BROWSER ?: params.BROWSER
                    def browserOption = "--project=${browser}"
                    def headedOption = params.HEADED ? "--headed" : ""
                    
                    // Add additional options for better stability in CI
                    def ciOptions = ""
                    if (env.JENKINS_URL) {
                        ciOptions = "--workers=1 --retries=2"
                        echo "🏗️ Jenkins environment detected - using single worker and retries for stability"
                    }
                    
                    switch(params.TEST_SUITE) {
                        case 'all':
                            echo '🧪 Running all catalog tests...'
                            testCommand += " tests/catalog/ ${reporterOptions} ${browserOption} ${headedOption} ${ciOptions}"
                            break
                        case 'browse-products':
                            echo '🛒 Running browse products tests...'
                            testCommand += " tests/catalog/browse-products.spec.js ${reporterOptions} ${browserOption} ${headedOption} ${ciOptions}"
                            break
                        case 'filter-products':
                            echo '🔍 Running filter products tests...'
                            testCommand += " tests/catalog/filter-products.spec.js ${reporterOptions} ${browserOption} ${headedOption} ${ciOptions}"
                            break
                        case 'pagination':
                            echo '📄 Running pagination tests...'
                            testCommand += " tests/catalog/pagination.spec.js ${reporterOptions} ${browserOption} ${headedOption} ${ciOptions}"
                            break
                        case 'product-details':
                            echo '📋 Running product details tests...'
                            testCommand += " tests/catalog/product-details.spec.js ${reporterOptions} ${browserOption} ${headedOption} ${ciOptions}"
                            break
                        case 'sort-products':
                            echo '🔄 Running sort products tests...'
                            testCommand += " tests/catalog/sort-products.spec.js ${reporterOptions} ${browserOption} ${headedOption} ${ciOptions}"
                            break
                    }
                    
                    echo "🏃 Executing: ${testCommand}"
                    echo "🔧 Browser: ${browser}"
                    
                    try {
                        sh testCommand
                    } catch (Exception e) {
                        echo "⚠️ Tests failed with error: ${e.getMessage()}"
                        throw e
                    }
                }
            }
        }
        
        stage('Generate Allure Report') {
            steps {
                echo '📈 Generating Allure report...'
                
                script {
                    try {
                        // Generate Allure report
                        sh 'npm run report:allure'
                        echo '✅ Allure report generated successfully'
                    } catch (Exception e) {
                        echo "⚠️ Allure report generation failed: ${e.getMessage()}"
                        
                        // Try alternative method if npm script fails
                        try {
                            sh 'npx allure generate allure-results --clean -o allure-report'
                            echo '✅ Allure report generated using npx'
                        } catch (Exception e2) {
                            echo "❌ Alternative Allure generation also failed: ${e2.getMessage()}"
                            
                            // Create basic index file if all else fails
                            sh '''
                                mkdir -p allure-report
                                echo "<html><body><h1>Allure Report Generation Failed</h1><p>Check console logs for details</p></body></html>" > allure-report/index.html
                            '''
                        }
                    }
                }
            }
        }
    }
    
    post {
        always {
            echo '🧹 Post-build cleanup and reporting...'
            
            // Archive test artifacts
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-results/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-report/**/*', allowEmptyArchive: true
            
            // Publish Allure Report (Method 1 - Using Allure Plugin)
            script {
                try {
                    allure([
                        includeProperties: false,
                        jdk: '',
                        properties: [],
                        reportBuildPolicy: 'ALWAYS',
                        results: [[path: 'allure-results']]
                    ])
                    echo '✅ Allure plugin report published'
                } catch (Exception e) {
                    echo "⚠️ Allure plugin not available, using HTML publisher: ${e.getMessage()}"
                    
                    // Fallback: Publish HTML report (Method 2)
                    if (fileExists('allure-report')) {
                        publishHTML([
                            allowMissing: false,
                            alwaysLinkToLastBuild: true,
                            keepAll: true,
                            reportDir: 'allure-report',
                            reportFiles: 'index.html',
                            reportName: 'Allure Test Report',
                            reportTitles: 'Fenix Catalog Test Results'
                        ])
                        echo '✅ HTML report published'
                    }
                }
            }
            
            // Send test summary
            script {
                def testFiles = sh(
                    script: "find allure-results -name '*-result.json' 2>/dev/null | wc -l || echo '0'",
                    returnStdout: true
                ).trim()
                
                def passedTests = sh(
                    script: "find allure-results -name '*-result.json' 2>/dev/null -exec grep -l '\"status\":\"passed\"' {} \\; | wc -l || echo '0'",
                    returnStdout: true
                ).trim()
                
                def failedTests = sh(
                    script: "find allure-results -name '*-result.json' 2>/dev/null -exec grep -l '\"status\":\"failed\"' {} \\; | wc -l || echo '0'",
                    returnStdout: true
                ).trim()
                
                echo "📊 Test Summary:"
                echo "   • Test Suite: ${params.TEST_SUITE}"
                echo "   • Browser: ${params.BROWSER}"
                echo "   • Branch: ${params.BRANCH}"
                echo "   • Total Tests: ${testFiles}"
                echo "   • Passed: ${passedTests}"
                echo "   • Failed: ${failedTests}"
                echo "   • 📋 View detailed results in Allure Report"
            }
        }
        
        success {
            echo "🎉 ${params.TEST_SUITE} tests PASSED on ${params.BROWSER}!"
        }
        
        failure {
            echo "❌ ${params.TEST_SUITE} tests FAILED on ${params.BROWSER}!"
            echo "📋 Check the Allure report for detailed results."
        }
        
        unstable {
            echo "⚠️ ${params.TEST_SUITE} tests are UNSTABLE on ${params.BROWSER}!"
        }
    }
}