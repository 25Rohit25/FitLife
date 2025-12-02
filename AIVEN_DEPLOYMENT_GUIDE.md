# Step-by-Step Deployment Guide (Aiven + Render + Vercel)

This guide assumes you have your project code ready on your local machine.

## Phase 1: Set up Free MySQL Database on Aiven
1.  **Sign Up**: Go to [Aiven Console](https://console.aiven.io/) and create an account.
2.  **Create Service**:
    *   Click **Create service**.
    *   Select **MySQL**.
    *   **Cloud Provider**: Choose **Google Cloud** (it often has the best free tier availability).
    *   **Region**: Select a region. Look for the label **"Free Plan Available"** or similar.
    *   **Service Plan**: Select the **Free** plan (e.g., `Free-1-5gb`).
    *   **Name**: Enter a name (e.g., `fitlifepro-db`).
    *   Click **Create Service**.
3.  **Get Credentials**:
    *   Wait for the service status to turn **Running** (green).
    *   On the **Overview** page, look at the **Connection information** section.
    *   Note down the following:
        *   **Host** (e.g., `mysql-3b7...aivencloud.com`)
        *   **Port** (e.g., `26543`)
        *   **User** (usually `avnadmin`)
        *   **Password** (click to reveal/copy)
        *   **Database Name** (usually `defaultdb`)

## Phase 2: Push Code to GitHub
If you haven't already pushed your code to GitHub:
1.  Create a new repository on GitHub (e.g., `fitlifepro`).
2.  Open your terminal in the project folder (`c:\Users\dell\OneDrive\Desktop\FitLifePro`) and run:
    ```bash
    git init
    git add .
    git commit -m "Ready for deployment"
    git branch -M main
    git remote add origin https://github.com/<YOUR_USERNAME>/fitlifepro.git
    git push -u origin main
    ```

## Phase 3: Deploy Backend to Render
1.  Go to [Render Dashboard](https://dashboard.render.com/).
2.  Click **New +** -> **Blueprint**.
3.  Connect your GitHub account and select the `fitlifepro` repository.
4.  **Configuration**:
    *   Render will detect the `render.yaml` file I created for you.
    *   It will ask for **Environment Variables**. Fill them in using your Aiven details:

    | Variable | Value to Enter |
    | :--- | :--- |
    | `MYSQL_URL` | `jdbc:mysql://<HOST>:<PORT>/defaultdb?sslMode=REQUIRED` <br> *(Replace <HOST> and <PORT> with Aiven values)* |
    | `MYSQL_USER` | `avnadmin` (or your Aiven user) |
    | `MYSQL_PASSWORD` | Your Aiven password |
    | `GEMINI_API_KEY` | Your Google Gemini API Key |
    | `JWT_SECRET` | Type a long random string (e.g., `mysecretkey12345`) |

5.  Click **Apply**.
6.  Wait for the deployment to finish. It might take a few minutes.
7.  Once done, copy the **Service URL** from the dashboard (e.g., `https://fitlifepro-backend.onrender.com`).

## Phase 4: Deploy Frontend to Vercel
1.  Go to [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **Add New...** -> **Project**.
3.  Import the `fitlifepro` repository.
4.  **Project Configuration**:
    *   **Framework Preset**: Vite
    *   **Root Directory**: Click **Edit** and select the `client` folder. **(Crucial Step)**
5.  **Environment Variables**:
    *   Click to expand the Environment Variables section.
    *   **Key**: `VITE_API_URL`
    *   **Value**: Your Render Backend URL (from Phase 3). **Do not add a trailing slash** (e.g., `https://fitlifepro-backend.onrender.com`).
6.  Click **Deploy**.

## Success!
Your app should now be live.
- Open the Vercel URL to see your frontend.
- It will connect to the Render backend.
- The Render backend will store data in your Aiven MySQL database.
