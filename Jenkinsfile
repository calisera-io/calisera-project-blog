pipeline {
    agent any

    options {
        skipDefaultCheckout(true) 
    }

    stages {
        stage("Checkout") {
            steps {
                git url: 'https://github.com/calisera-io/calisera-project-blog.git'
            }
        }
    }
}
