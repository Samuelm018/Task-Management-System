# Task Management System 🚀

A robust and modern Task Management application built with a **Flask REST API** backend and a **Premium Next.js** frontend.

Designed to be simple, secure, and beautiful.

## ✨ Features

- **🔐 Secure Authentication**: User registration and login with JWT-based protection.
- **📝 Task Management**: Create, Read, Update, and Delete (CRUD) your personal tasks.
- **🎨 Premium UI**: A sleek, modern dashboard featuring glassmorphism design, smooth animations, and responsive layouts.
- **🛡️ Data Privacy**: Users can only access their own tasks.
- **⚡ Fast & Responsive**: Built with Next.js App Router and optimized for performance.

## 🛠️ Tech Stack

### Backend
- **Framework**: Flask (Python)
- **Database**: SQLite (via SQLAlchemy)
- **Auth**: PyJWT for token-based authentication
- **API**: RESTful architecture with Blueprints

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules with custom "Premium" design system (No external UI libraries)

---

## 🚀 Getting Started

Follow these steps to get the project running locally.

### 1. Backend Setup (Flask)

Navigate to the root directory:

```bash
# Create a virtual environment (optional but recommended)
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```
The API will be available at `http://127.0.0.1:5000`.

### 2. Frontend Setup (Next.js)

Open a new terminal and navigate to the `frontend` folder:

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📂 Project Structure

```text
project/
├── app.py                 # Flask Application Entry Point
├── models/                # Database Models (User, Task)
├── routes/                # API Endpoints (Auth, Tasks)
├── utils/                 # Helpers (JWT, Validators)
└── frontend/              # Next.js Application
    ├── src/app/           # App Router Pages
    ├── src/components/    # React Components (Auth, TaskManager)
    └── src/styles/        # Global Premium Styles
```

## 🤝 Contributing

Feel free to fork this repository and submit pull requests. Any improvements are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
