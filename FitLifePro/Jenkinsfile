pipeline {
    agent any
    
    stages {
        /* 
           Optimization: We skip the manual 'mvn' and 'npm' build stages 
           because the Dockerfiles in server-java and client are already 
           configured to do multi-stage builds (compiling the code inside the container).
           This avoids "mvn not found" or "npm not found" errors on the Jenkins host.
        */

        stage('Docker Build') {
            steps {
                // Navigate to the project directory (since repo root is one level up)
                dir('FitLifePro') {
                    script {
                        // Try to find docker-compose, fallback to full path if needed
                        // We use the full path found on your system to be safe
                        bat '"C:\\Program Files\\Docker\\Docker\\resources\\bin\\docker-compose.exe" build'
                    }
                }
            }
        }
    }
}
