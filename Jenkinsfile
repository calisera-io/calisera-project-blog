pipeline {
    agent any

    options {
        skipDefaultCheckout(true)  // disable automatic checkout
    }

    stages {
        stage("Checkout") {
            steps {
                git(
                    branch: 'pipeline',
                    url: 'https://github.com/calisera-io/calisera-project-blog.git',
                    credentialsId: 'github-token'
                )
            }
        }
    }
}
