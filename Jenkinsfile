pipeline {
    agent any

    environment {
        IMAGE_NAME   = "saira102/sadotask2"
        IMAGE_TAG    = "${BUILD_NUMBER}"
        DOCKER_CREDS = credentials('dockerhub-creds')
    }

    stages {
        stage('Pull Code from GitHub') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/55503saira/sadotask2.git'
            }
        }

        stage('Test') {
            steps {
                sh 'cd tests && npm install && npm test'
            }
            post {
                always {
                    junit allowEmptyResults: true, testResults: 'tests/junit.xml'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$IMAGE_TAG -t $IMAGE_NAME:latest .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh 'echo $DOCKER_CREDS_PSW | docker login -u $DOCKER_CREDS_USR --password-stdin'
                sh 'docker push $IMAGE_NAME:$IMAGE_TAG'
                sh 'docker push $IMAGE_NAME:latest'
            }
        }

        stage('EC2 Credential Check') {
            steps {
                sshagent(credentials: ['ec2-ssh']) {
                    sh 'ssh-add -l'
                }
            }
        }
    }

    post {
        always  { sh 'docker logout || true' }
        success { echo 'Pipeline finished successfully' }
        failure { echo 'Pipeline failed' }
    }
}
