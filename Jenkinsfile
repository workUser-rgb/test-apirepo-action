pipeline {
    agent any

    environment {
        NODE_VERSION = '20' // Set the Node.js version
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/JeelGajera/test-apirepo-action.git'
            }
        }

        stage('Setup Node.js') {
            steps {
                script {
                    def nodeExists = sh(script: 'which node || true', returnStdout: true).trim()
                    if (!nodeExists) {
                        error "Node.js is not installed. Install Node.js before running the pipeline."
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

      stage('Trigger Vulnerability Scan') {
      steps {
          script {
              def scanResult = sh(script: '''
                  curl -X POST "http://localhost:8080/jenkins/job/dast-test/buildWithParameters?DEPLOYMENT_URL=$DEPLOYMENT_URL" \
                  --user "admin:1196f4612ea74b55bf3fcb17945e9671e5"
              ''', returnStatus: true)
              
              if (scanResult != 0) {
                  error "Vulnerability Scan failed!"
              }
          }
      }
}

    }

    post {
        success {
            echo '✅ Build and Tests Passed!'
        }
        failure {
            echo '❌ Build Failed. Check Logs.'
        }
    }
}
