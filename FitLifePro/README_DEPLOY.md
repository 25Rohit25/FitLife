# FitLife Pro Deployment Guide

This guide covers the steps to build, run, and deploy the FitLife Pro application with React, Spring Boot, and MySQL.

## Prerequisites
- Docker & Docker Compose
- Kubernetes (Minikube or Docker Desktop K8s)
- Ansible
- Java 17+
- Node.js 18+

## 1. Local Development (Docker Compose)
To run the full stack locally using Docker Compose:
1. Ensure Docker is running.
2. Run:
   ```bash
   docker-compose up --build
   ```
   *Note: You may need to update `docker-compose.yml` to use the new MySQL configuration if it was previously set for MongoDB.*

## 2. Kubernetes Deployment
To deploy to a local Kubernetes cluster:
1. Build the images:
   ```bash
   docker build -t fitlifepro-backend:latest ./server-java
   docker build -t fitlifepro-frontend:latest ./client
   ```
2. Apply manifests:
   ```bash
   kubectl apply -f k8s/
   ```
   
   **Alternative: Using Ansible**  
   *Note: Ansible requires a Linux environment (like WSL on Windows).*
   If you have Ansible installed:
   ```bash
   ansible-playbook ansible/deploy.yml
   ```

## 3. GitHub Actions
The `.github/workflows/docker-publish.yml` workflow will automatically build and push Docker images to Docker Hub on push to `main`.
Ensure you have set `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` secrets in your GitHub repository.

## 4. Database Migration
The application is configured to use MySQL.
- The `User`, `Workout`, `Meal`, `DailyStats` entities have been converted to JPA Entities.
- `application.properties` is configured for MySQL.
- Ensure a MySQL instance is running (handled by Docker/K8s).

## 5. Role-Based Authentication
- Users are assigned `ROLE_USER` by default upon registration.
- You can add more roles in the database or update `AuthController` logic.
