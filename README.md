Task Management System

This project is a full-stack task management application with a Flask-based REST API backend and a modern Next.js frontend. The goal is to provide a simple, secure, and well-structured system for managing personal tasks while following clean architecture and best practices.

Overview

The application allows users to register, authenticate, and manage their own tasks. The backend exposes a RESTful API secured with JWT authentication, while the frontend provides a responsive and polished user interface built with Next.js.

Each user’s data is isolated, and access to protected resources is strictly enforced.

Features

User registration and login with JWT-based authentication

Full CRUD operations for user-specific tasks

Secure access to protected API endpoints

Clean and maintainable backend architecture using Flask Blueprints

Modern frontend built with Next.js App Router

Responsive and performance-optimized user interface

Tech Stack
Backend

Python

Flask

SQLite (using SQLAlchemy ORM)

JWT for authentication

RESTful API architecture

Frontend

Next.js 14 (App Router)

TypeScript

CSS Modules with a custom design system

No external UI libraries

Getting Started
Backend Setup

Navigate to the root directory and set up the backend:

python -m venv venv


Activate the virtual environment:

Windows:

venv\Scripts\activate


macOS/Linux:

source venv/bin/activate


Install dependencies and start the server:

pip install -r requirements.txt
python app.py


The backend API will run at:

http://127.0.0.1:5000

Frontend Setup

Open a new terminal and move to the frontend directory:

cd frontend
npm install
npm run dev


The frontend will be available at:

http://localhost:3000

Project Structure
project/
├── app.py
├── models/
│   ├── user.py
│   └── task.py
├── routes/
│   ├── auth_routes.py
│   └── task_routes.py
├── utils/
│   ├── jwt_utils.py
│   └── validators.py
└── frontend/
    ├── src/app/
    ├── src/components/
    └── src/styles/
