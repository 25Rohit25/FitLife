# CI/CD Setup Guide for FitLife Pro

This guide explains how to set up Continuous Integration and Deployment using **GitHub Actions** and **Jenkins**.

## 1. GitHub Actions (Automated Cloud CI)

We have already created the workflow file at `.github/workflows/main.yml`.

### How it works:
- Automatically triggers on every `push` to `master` or `main`.
- **Backend Job**: Sets up Java 17, installs Maven dependencies, and builds the Spring Boot JAR.
- **Frontend Job**: Sets up Node.js 18, installs dependencies, and builds the React app.
- **Docker Job**: Verifies that Docker images can be built successfully.

### Setup Steps:
1.  **Push your code to GitHub**:
    ```bash
    git init
    git add .
    git commit -m "Initial commit with CI/CD"
    git branch -M main
    git remote add origin <your-github-repo-url>
    git push -u origin main
    ```
2.  Go to the **Actions** tab in your GitHub repository.
3.  You will see the "FitLife Pro CI/CD" workflow running automatically.

---

## 2. Jenkins (Self-Hosted CI)

We have created a `Jenkinsfile` in the root directory.

### Prerequisites:
- Jenkins installed and running.
- **Docker Pipeline** plugin installed in Jenkins.
- Docker installed on the Jenkins server (and the `jenkins` user must have permission to run docker commands).

### Setup Steps:

1.  **Create a New Pipeline Job**:
    - Open Jenkins Dashboard -> **New Item**.
    - Enter a name (e.g., `FitLifePro-Pipeline`).
    - Select **Pipeline** and click **OK**.

2.  **Configure Pipeline**:
    - Scroll down to the **Pipeline** section.
    - **Definition**: Select `Pipeline script from SCM`.
    - **SCM**: Select `Git`.
    - **Repository URL**: Enter your local file path (if testing locally) or your GitHub URL.
        - Example Local: `file:///C:/Users/dell/OneDrive/Desktop/newag/FitLifePro` (Note: Jenkins might need special config to access local files)
        - **Recommended**: Push to GitHub and use the GitHub HTTPS URL.
    - **Branch Specifier**: `*/main` (or `*/master`).
    - **Script Path**: `Jenkinsfile` (default).

3.  **Run the Pipeline**:
    - Click **Save**.
    - Click **Build Now** on the left menu.

### Troubleshooting Jenkins on Windows:
If you are running Jenkins directly on Windows (not in Docker) and don't have the Docker Pipeline plugin configured:
1.  Open the `Jenkinsfile`.
2.  Replace `sh` commands with `bat`.
3.  Remove the `agent { docker ... }` blocks and ensure Maven and Node.js are installed globally on your Windows machine and added to the System PATH.

**Example Windows-specific Jenkinsfile snippet:**
```groovy
stage('Build Backend') {
    steps {
        dir('server-java') {
            bat 'mvn clean package -DskipTests'
        }
    }
}
```
