
Jenkinsfile (Declarative Pipeline)

pipeline {
    agent { docker 'node:6.8.0' }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}

