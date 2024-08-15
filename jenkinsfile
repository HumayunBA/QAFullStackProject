pipeline {
    agent any
    stages {
        stage("install") {
            steps {
                bat "npm install"
            }
        }
        stage("unit test") {
            steps {
                bat "npm run test:unit"
            }
        }
        stage("integration test") {
            steps {
                bat "npm run test:integration"
            }
        }
    }
}