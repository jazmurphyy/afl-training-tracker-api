pipeline {
agent any

    environment {
        PATH = "/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
    }


    stages {

       stage('Build') {
    steps {
        sh 'npm install'
        sh 'docker build -t afl-training-tracker-api:${BUILD_NUMBER} .'
        sh 'docker tag afl-training-tracker-api:${BUILD_NUMBER} afl-training-tracker-api:latest'
    }
}

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Code Quality') {
            steps {
               withCredentials([string(credentialsId: 'SONAR_TOKEN', variable: 'SONAR_TOKEN')]) {
    sh '''
    sonar \
    -Dsonar.token=$SONAR_TOKEN \
    -Dsonar.projectKey=jazmurphyy_afl-training-tracker-api \
    -Dsonar.organization=jazmurphyy
    '''
}
            }
        }

        stage('Security') {
            steps {
                sh 'npm audit'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker compose up -d'
            }
        }

     stage('Release') {
    steps {
        withCredentials([string(credentialsId: 'RENDER_DEPLOY_HOOK', variable: 'RENDER_DEPLOY_HOOK')]) {
            sh 'curl -X POST $RENDER_DEPLOY_HOOK'
        }
        echo 'Application promoted to production environment on Render'
    }
}
    }
}