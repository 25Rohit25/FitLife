# FitLife Pro 🏋️‍♂️

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-green?style=for-the-badge&logo=spring-boot)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?style=for-the-badge&logo=mongodb)
![Docker](https://img.shields.io/badge/Docker-Enabled-blue?style=for-the-badge&logo=docker)

**FitLife Pro** is a comprehensive, full-stack fitness tracking application designed to help users achieve their health goals through AI-powered coaching, detailed analytics, and gamification.

Built with a modern **React** frontend and a robust **Spring Boot** backend, it leverages **Google's Gemini AI** to provide personalized fitness advice.

---

## 🚀 Key Features

*   **🤖 AI Personal Coach**: Chat with an intelligent AI assistant (powered by Google Gemini) for personalized workout plans, nutrition advice, and motivation.
*   **📊 Interactive Dashboard**: Visualize your progress with dynamic charts for steps, calories, sleep, and macro breakdown.
*   **🏋️‍♂️ Workout Logger**: Log workouts easily using quick templates or custom entries. Track sets, reps, and intensity.
*   **🥗 Diet & Macro Tracker**: Monitor your daily caloric intake and macronutrient distribution (Carbs, Protein, Fats).
*   **💧 Hydration Tracker**: Keep track of your daily water intake with a visual progress bar.
*   **🎮 Gamification**: Level up your fitness journey! Earn XP, unlock badges, and maintain streaks to stay motivated.
*   **🔐 Secure Authentication**: Fully secure user registration and login system using JWT (JSON Web Tokens).

---

## 🛠️ Tech Stack

### Frontend
*   **Framework**: React (Vite)
*   **Styling**: Tailwind CSS, Framer Motion (Animations)
*   **Charts**: Recharts
*   **Icons**: Lucide React

### Backend
*   **Framework**: Java Spring Boot 3.2
*   **Database**: MongoDB
*   **Security**: Spring Security, JWT
*   **AI Integration**: Google Gemini API (gemini-2.5-flash-lite)
*   **Build Tool**: Maven

### DevOps
*   **Containerization**: Docker & Docker Compose
*   **CI/CD**: GitHub Actions & Jenkins

---

## 🏁 Getting Started

### Prerequisites
*   Java 17+
*   Node.js 18+
*   MongoDB (running locally or via Docker)
*   Docker Desktop (optional, for containerized run)

### Option 1: Run with Docker (Recommended) 🐳
The easiest way to run the entire stack (Frontend + Backend + Database).

1.  Clone the repository:
    ```bash
    git clone https://github.com/25Rohit25/FitLife.git
    cd FitLife/FitLifePro
    ```
2.  Run with Docker Compose:
    ```bash
    docker-compose up --build
    ```
3.  Access the app:
    *   **Frontend**: [http://localhost:5173](http://localhost:5173)
    *   **Backend API**: [http://localhost:5000](http://localhost:5000)

### Option 2: Run Locally 💻

#### 1. Backend (Spring Boot)
```bash
cd server-java
# Ensure MongoDB is running locally on port 27017
mvn spring-boot:run
```

#### 2. Frontend (React)
```bash
cd client
npm install
npm run dev
```

---

## 📂 Project Structure

```
FitLifePro/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # UI Components (Dashboard, WorkoutLogger, etc.)
│   │   ├── context/        # React Context (Auth, Gamification)
│   │   └── ...
│   └── Dockerfile
│
├── server-java/            # Spring Boot Backend
│   ├── src/main/java/com/fitlifepro/
│   │   ├── controller/     # REST Controllers
│   │   ├── model/          # MongoDB Models
│   │   ├── service/        # Business Logic
│   │   └── security/       # JWT Auth
│   └── Dockerfile
│
├── docker-compose.yml      # Docker orchestration
├── Jenkinsfile             # Jenkins CI/CD Pipeline
└── .github/workflows/      # GitHub Actions CI/CD
```

---

## 🔄 CI/CD Pipelines

This project includes fully configured CI/CD pipelines:
*   **GitHub Actions**: Automatically builds and tests Backend & Frontend on every push to `main`.
*   **Jenkins**: A declarative pipeline for self-hosted CI environments, supporting Docker-based builds.

---

## 👨‍💻 Author

**Rohit** - Full Stack Developer
*   [GitHub Profile](https://github.com/25Rohit25)

---

*Built with ❤️ and code.*
