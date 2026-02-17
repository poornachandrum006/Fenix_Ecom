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
            defaultValue: 'master',
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
                checkout scmGit(
                    branches: [[name: "*/${params.BRANCH}"]],
                    extensions: [],
                    userRemoteConfigs: [[url: "${env.GIT_URL}"]]
                )
            }
        }
        
        stage('Environment Info') {
            steps {
                echo '🔍 Environment Information:'
                sh 'node --version || echo "Node.js not found"'
                sh 'npm --version || echo "npm not found"'
                sh 'pwd && ls -la'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo '📦 Installing dependencies...'
                sh 'npm ci || npm install'
                sh 'npx playwright install ${BROWSER}'
            }
        }
        
        stage('Run Catalog Tests') {
            steps {
                script {
                    def testCommand = "npx playwright test"
                    def reporterOptions = "--reporter=line,allure-playwright"
                    def browserOption = "--project=${params.BROWSER}"
                    def headedOption = params.HEADED ? "--headed" : ""
                    
                    switch(params.TEST_SUITE) {
                        case 'all':
                            echo '🧪 Running all catalog tests...'
                            testCommand += " tests/catalog/ ${reporterOptions} ${browserOption} ${headedOption}"
                            break
                        case 'browse-products':
                            echo '🛒 Running browse products tests...'
                            testCommand += " tests/catalog/browse-products.spec.js ${reporterOptions} ${browserOption} ${headedOption}"
                            break
                        case 'filter-products':
                            echo '🔍 Running filter products tests...'
                            testCommand += " tests/catalog/filter-products.spec.js ${reporterOptions} ${browserOption} ${headedOption}"
                            break
                        case 'pagination':
                            echo '📄 Running pagination tests...'
                            testCommand += " tests/catalog/pagination.spec.js ${reporterOptions} ${browserOption} ${headedOption}"
                            break
                        case 'product-details':
                            echo '📋 Running product details tests...'
                            testCommand += " tests/catalog/product-details.spec.js ${reporterOptions} ${browserOption} ${headedOption}"
                            break
                        case 'sort-products':
                            echo '🔄 Running sort products tests...'
                            testCommand += " tests/catalog/sort-products.spec.js ${reporterOptions} ${browserOption} ${headedOption}"
                            break
                    }
                    
                    echo "🏃 Executing: ${testCommand}"
                    sh testCommand
                }
            }
        }
        
        stage('Generate Allure Report') {
            steps {
                echo '📈 Generating Allure report...'
                sh 'npm run report:allure || echo "⚠️ Allure report generation failed but continuing..."'
            }
        }
    }
    
    post {
        always {
            echo '🧹 Post-build cleanup and reporting...'
            
            // Archive test artifacts
            archiveArtifacts artifacts: 'test-results/**/*', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-results/**/*', allowEmptyArchive: true
            
            // Publish Allure HTML report
            script {
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
                }
            }
            
            // Send test summary
            script {
                def testFiles = sh(
                    script: "find allure-results -name '*-result.json' 2>/dev/null | wc -l || echo '0'",
                    returnStdout: true
                ).trim()
                
                echo "📊 Test Summary:"
                echo "   • Test Suite: ${params.TEST_SUITE}"
                echo "   • Browser: ${params.BROWSER}"
                echo "   • Branch: ${params.BRANCH}"
                echo "   • Test Files: ${testFiles}"
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