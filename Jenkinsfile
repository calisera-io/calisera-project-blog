pipeline {
    agent {
        label 'ec2-worker'
    }

    triggers {
        githubPush()
        githubPullRequests(
            triggerMode: 'HEAVY_HOOKS',
            events: [
                Open(), 
                Synchronize()
            ]
        )
    }

    options {
        skipDefaultCheckout(true) 
    }

    environment {
        AWS_DEFAULT_REGION = 'us-east-1'
        AWS_BUCKET = 'blog.calisera.io'
        ARTIFACT_DIR = 'out'
    }

    stages {
        stage('Checkout') {
            steps {
                git(
                    branch: 'pipeline', 
					url: 'https://github.com/calisera-io/calisera-project-blog.git'
				) 
            }
        }

        stage('Build') {
            steps {
                script {
                    docker.image('node:20').inside('-u root:root') {
                        sh 'node -v'
                        sh 'npm -v'
                        sh 'npm install'
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Deploy') {
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
