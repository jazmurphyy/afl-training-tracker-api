pipeline {
agent any

    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }


    stages {

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
                sh '''
                sonar \
                -Dsonar.token=309bd52d926d650af30f1759de5644bccd61dd2f \
                -Dsonar.projectKey=jazmurphyy_afl-training-tracker-api \
                -Dsonar.organization=jazmurphyy
                '''
            }
        }

        stage('Security') {
            steps {
                sh 'npm audit'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose up -d --build'
            }
        }

        stage('Release') {
            steps {
                echo 'Release stage completed'
            }
        }
    }
}