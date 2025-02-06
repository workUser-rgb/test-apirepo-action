pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/your-repo/your-nextjs-project.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Next.js App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Run Vulnerability Scan') {
            steps {
                script {
                    step([$class: 'VulnerabilityScanBuilder', deploymentUrl: 'http://your-deployment-url.com'])
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
