pipeline {
    agent {
        label 'ec2-worker'
    }

    environment {
        AWS_DEFAULT_REGION = 'us-east-1'
        AWS_BUCKET = 'blog.calisera.io'
        ARTIFACT_DIR = 'out'
    }

    options {
        skipDefaultC
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                script {
                    docker.image('node:20').inside('-u root:root') {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Lint') {
            steps {
                script {
                    docker.image('node:20').inside('-u root:root') {
                        sh 'npm run lint'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    docker.image('node:20').inside('-u root:root') {
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    docker.image('node:20').inside('-u root:root') {
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                script {
                    docker.image('amazon/aws-cli').inside('--entrypoint="" -u root:root') {
                        sh """
                            aws s3 sync ${ARTIFACT_DIR}/ s3://${AWS_BUCKET}/ --delete \
                                --region ${AWS_DEFAULT_REGION}
                        """
                    }
                }
            }
        }
    }
}