# FitLife Pro - Java Spring Boot Backend

This is the migrated Spring Boot backend for FitLife Pro.

## Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- MongoDB (running locally on port 27017)

## Project Structure
- `src/main/java/com/fitlifepro`: Source code
  - `controller`: REST API endpoints
  - `model`: MongoDB data models
  - `repository`: Database access interfaces
  - `service`: Business logic (if any)
  - `security`: JWT authentication logic
  - `dto`: Data Transfer Objects

## Configuration
Configuration is located in `src/main/resources/application.properties`.
Key settings:
- Server Port: 5000
- MongoDB URI: `mongodb://localhost:27017/fitlifepro`
- JWT Secret: (Securely configured)
- Gemini API Key: (Configured)

## How to Run
1. Open a terminal in this directory (`server-java`).
2. Run the following command:
   ```bash
   mvn spring-boot:run
   ```

## API Endpoints
- **Auth**: `/api/auth/register`, `/api/auth/login`, `/api/auth/user`
- **Workouts**: `/api/workouts`
- **Meals**: `/api/meals`
- **Stats**: `/api/stats/today`, `/api/stats/sync-device`
- **AI Coach**: `/api/ai/ask`
- **Profile**: `/api/users/profile`, `/api/users/water`

## Troubleshooting
- **Port 5000 in use**: Stop any running Node.js server or previous Java instances.
- **MongoDB Connection Error**: Ensure MongoDB is running.
