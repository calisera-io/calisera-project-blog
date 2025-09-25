pipeline {
    agent {
        label 'ec2-worker'
    }

    options {
        skipDefaultCheckout(true) 
    }

    stages {
        stage("Checkout") {
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
    }
}
