pipeline {
    agent {
        label 'ec2-worker'
    }

    stages {
        stage('Checkout') {
            steps {
                git( 
                    url: 'https://github.com/calisera-io/calisera-project-blog.git', 
                    branch: env.BRANCH_NAME     
                )       
            }
        }

        stage('Permissions') {
            steps {
                sh 'sudo chown -R jenkins:jenkins /var/lib/jenkins/workspace'
            }
        }
        
        stage('Install') {
            steps {
                script {
                    docker.image('node:20').inside('-u root:root') {
                        sh 'npm ci'
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
    }
}
