# Deployment Instructions for FitLife Pro

## 1. Prepare GitHub Repository
Since your project is not yet connected to a remote repository:
1. Create a new repository on GitHub.
2. Run the following commands in your project root (`c:\Users\dell\OneDrive\Desktop\FitLifePro`):
   ```bash
   git init
   git add .
   git commit -m "Prepare for deployment"
   git branch -M main
   git remote add origin <YOUR_GITHUB_REPO_URL>
   git push -u origin main
   ```

## 2. Database Setup (MySQL)
The backend requires a MySQL database. You can use a cloud provider like:
- **Aiven** (Free tier available)
- **Clever Cloud** (Free tier available)
- **PlanetScale**
- **Render** (If you have a paid plan or use a Dockerized MySQL service)

**Required Information:**
- Hostname
- Port (default 3306)
- Database Name (e.g., `fitlifepro`)
- Username
- Password
- **Connection URL**: `jdbc:mysql://<HOST>:<PORT>/<DB_NAME>`

## 3. Deploy Backend to Render
1. Go to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** -> **Blueprint**.
3. Connect your GitHub repository.
4. Render will detect `render.yaml`.
5. You will be prompted to enter the Environment Variables:
   - `MYSQL_URL`: The JDBC URL from step 2.
   - `MYSQL_USER`: Your database username.
   - `MYSQL_PASSWORD`: Your database password.
   - `GEMINI_API_KEY`: Your Google Gemini API Key.
   - `JWT_SECRET`: A secure random string (Render might generate this for you).
6. Click **Apply**.
7. Wait for the deployment to finish. Copy the **Service URL** (e.g., `https://fitlifepro-backend.onrender.com`).

## 4. Deploy Frontend to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository.
4. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: Click `Edit` and select `client`.
   - **Environment Variables**:
     - Key: `VITE_API_URL`
     - Value: The Render Backend URL from step 3 (e.g., `https://fitlifepro-backend.onrender.com`).
5. Click **Deploy**.

## Troubleshooting
- **CORS Issues**: If the frontend cannot talk to the backend, ensure the backend URL in Vercel env vars is correct (no trailing slash usually, but check your code). The backend is configured to allow all origins (`*`) for now.
- **Database Connection**: Check the Render logs if the service fails to start. It usually means incorrect database credentials.
