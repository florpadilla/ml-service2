pipeline {
    agent any

    tools {
        nodejs '16.14.0'
    }

    stages {
        stage('Install') {
            steps {
                sh "npm install"
            }
        }

        stage('Unit Tests & Coverage') {
            steps {
                sh "npm test"
            }
        }
	}
}
