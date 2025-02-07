pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/JeelGajera/test-apirepo-action.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build Next.js App') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Run Vulnerability Scan') {
            steps {
                script {
                    step([$class: 'VulnerabilityScanBuilder', deploymentUrl: 'http://vulnerable.zerothreat.ai'])
                }
            }
        }
    }

    post {
        success {
            echo '✅ Build and Vulnerability Scan Completed!'
        }
        failure {
            echo '❌ Build or Vulnerability Scan Failed. Check Logs.'
        }
    }
}
