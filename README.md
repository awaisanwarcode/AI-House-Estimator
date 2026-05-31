# AI House Estimator

Welcome to the **AI House Estimator** project! This is a full-stack web application designed to estimate house prices using AI integration (Gemini/OpenAI), with a React frontend and a Node.js/Express backend.

## 🏗️ Project Structure

The repository is divided into two main components:

### Frontend
A modern web application built with **React** and **Vite**.
- **`Frontend/`**
  - `src/`: Source code for React components, pages, and assets.
  - `public/`: Static assets.
  - `package.json`: Frontend dependencies (React, React Router, Axios, React Icons).
  - `vite.config.js`: Configuration for the Vite bundler.

### Backend
A robust RESTful API built with **Node.js** and **Express**.
- **`Backend/`**
  - `controller/`: Request handlers and business logic.
  - `Middlewares/`: Express middlewares (e.g., authentication, error handling).
  - `Model/`: Mongoose database schemas.
  - `router/`: API route definitions.
  - `utils/`: Utility functions and helpers.
  - `index.js`: Main entry point for the backend server.
  - `.env`: Environment variables configuration.

---

## ⚙️ Environment Variables

To run the backend properly, you need to configure your environment variables. Create a `.env` file in the `Backend/` directory (or use the existing one) with the following structure:

```env
# Server Configuration
PORT=3000
FRONTEND_URL="http://localhost:5173"

# AI Integrations
OPENAI_API_KEY="your_openai_api_key_here"
GEMINI_API_KEY="your_gemini_api_key_here"
NAME="Gemini API Key"
PROJECTNAME="projects/your_project_name"
PROJECTNO=your_project_number

# Database
DB_URL="mongodb://localhost:27017/AI_HouseEstimator"

# Email / SMTP Settings (for nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER="your_email@example.com"
SMTP_PASS="your_app_password"
SMTP_FROM="houser-estimator <noreply@houser-estimator>"
EMAIL="your_email@example.com"

# Authentication
JWT_SECRET="your_jwt_secret"
```

> **Note:** Do not commit actual secrets to version control.

---

## 🚀 How to Start the Project

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) running locally (or update `DB_URL` to a cloud cluster)

### 1. Starting the Backend
Navigate to the backend directory, install dependencies, and start the server:

```bash
cd Backend
npm install
npm run dev
```
*The backend runs on `http://localhost:3000` (or your configured `PORT`) using Node's native watch mode.*

### 2. Starting the Frontend
Open a new terminal window, navigate to the frontend directory, install dependencies, and start the Vite dev server:

```bash
cd Frontend
npm install
npm run dev
```
*The frontend typically runs on `http://localhost:5173`.*

---

## 🛠️ Built With

* **Frontend:** React, Vite, TailwindCSS/Vanilla CSS, Axios, React Router DOM
* **Backend:** Node.js, Express, MongoDB (Mongoose), JSON Web Token (JWT), Argon2, Nodemailer, Google GenAI
