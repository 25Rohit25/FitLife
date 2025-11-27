# FitLife Pro 🏋️‍♂️

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-green?style=for-the-badge&logo=spring-boot)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=for-the-badge&logo=mysql)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue?style=for-the-badge&logo=docker)
![Kubernetes](https://img.shields.io/badge/Kubernetes-Ready-blue?style=for-the-badge&logo=kubernetes)

**FitLife Pro** is a comprehensive, full-stack fitness tracking application designed to help users achieve their health goals through AI-powered coaching, detailed analytics, and gamification.

Built with a modern **React** frontend and a robust **Spring Boot** backend, it leverages **Google's Gemini AI** to provide personalized fitness advice. The application is fully containerized with **Docker** and ready for deployment on **Kubernetes**.

---

## 🚀 Key Features

*   **🤖 AI Personal Coach**: Chat with an intelligent AI assistant (powered by Google Gemini) for personalized workout plans, nutrition advice, and motivation.
*   **📊 Interactive Dashboard**: Visualize your progress with dynamic charts for steps, calories, sleep, and macro breakdown.
*   **🏋️‍♂️ Workout Logger**: Log workouts easily using quick templates or custom entries. Track sets, reps, and intensity.
*   **🥗 Diet & Macro Tracker**: Monitor your daily caloric intake and macronutrient distribution (Carbs, Protein, Fats).
*   **💧 Hydration Tracker**: Keep track of your daily water intake with a visual progress bar.
*   **🎮 Gamification**: Level up your fitness journey! Earn XP, unlock badges, and maintain streaks to stay motivated.
*   **🔐 Secure Authentication**: Fully secure user registration and login system using JWT (JSON Web Tokens) and Role-Based Access Control (RBAC).

---

## 🛠️ Tech Stack

### Frontend
*   **Framework**: React (Vite)
*   **Styling**: Tailwind CSS, Framer Motion (Animations)
*   **Charts**: Recharts
*   **Icons**: Lucide React

### Backend
*   **Framework**: Java Spring Boot 3.2
*   **Database**: MySQL 8.0 (JPA/Hibernate)
*   **Security**: Spring Security, JWT
*   **AI Integration**: Google Gemini API (gemini-2.5-flash-lite)
*   **Build Tool**: Maven

### DevOps & Infrastructure
*   **Containerization**: Docker & Docker Compose
*   **Orchestration**: Kubernetes (K8s)
*   **Automation**: Ansible
*   **CI/CD**: GitHub Actions & Jenkins

---

## 🏁 Getting Started

### Prerequisites
*   Docker Desktop (with Kubernetes enabled)
*   Java 17+ (optional, for local dev)
*   Node.js 18+ (optional, for local dev)

### 🐳 Option 1: Run with Docker (Recommended)
The easiest way to run the entire stack (Frontend + Backend + MySQL).

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/25Rohit25/FitLife.git
    cd FitLife/FitLifePro
    ```

2.  **Setup Environment Variables:**
    Copy `.env.example` to `.env` and add your Gemini API Key.
    ```bash
    cp .env.example .env
    # Edit .env and set GEMINI_API_KEY=your_key_here
    ```

3.  **Run with Docker Compose:**
    ```bash
    docker-compose up --build
    ```

4.  **Access the app:**
    *   **Frontend**: [http://localhost](http://localhost)
    *   **Backend API**: [http://localhost:5000](http://localhost:5000)
    *   **Database**: `localhost:3307` (User: `root`, Pass: `root`)

### ☸️ Option 2: Deploy to Kubernetes
Deploy the application to a local Kubernetes cluster (e.g., Minikube or Docker Desktop).

1.  **Apply Manifests:**
    ```bash
    kubectl apply -f k8s/
    ```

2.  **Access the app:**
    *   **Frontend**: [http://localhost:30000](http://localhost:30000)

---

## 📂 Project Structure

```
FitLifePro/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components
│   │   ├── context/        # React Context
│   │   └── ...
│   └── Dockerfile
│
├── server-java/            # Spring Boot Backend
│   ├── src/main/java/com/fitlifepro/
│   │   ├── controller/     # REST Controllers
│   │   ├── model/          # JPA Entities (MySQL)
│   │   ├── repository/     # JPA Repositories
│   │   └── security/       # JWT Auth
│   └── Dockerfile
│
├── k8s/                    # Kubernetes Manifests
├── ansible/                # Ansible Deployment Playbook
├── docker-compose.yml      # Docker orchestration
├── Jenkinsfile             # Jenkins CI/CD Pipeline
└── .github/workflows/      # GitHub Actions CI/CD
```

---

## 🔄 CI/CD Pipelines

This project includes fully configured CI/CD pipelines:
*   **GitHub Actions**: Automatically builds and pushes Docker images to Docker Hub on every push to `main`.
*   **Jenkins**: A declarative pipeline for self-hosted CI environments, supporting Docker-based builds.

---

## 👨‍💻 Author

**Rohit** - Full Stack Developer
*   [GitHub Profile](https://github.com/25Rohit25)

---

*Built with ❤️ and code.*
