![Untitled design (6)](https://github.com/user-attachments/assets/de841f77-dfc3-4c7b-bb57-c9871ef646b2)
![Untitled design (7)](https://github.com/user-attachments/assets/11508faa-cc52-4c7e-869a-2d86305cf954)

# Authentication System with Role-Based Access Control

## Project Overview
This repository contains a complete authentication system with role-based access control (RBAC). The system supports user registration, login, and password reset functionalities. Each user can be assigned one of three roles: **User**, **Admin**, or **Super Admin**, during the registration process. Depending on the assigned role, users will be redirected to their respective dashboards.

## Features
- **User Roles:**
  - **User Dashboard:** Access to standard features for regular users.
  - **Admin Dashboard:** Additional administrative functions.
  - **Super Admin Dashboard:** Complete control over the application.
- **Authentication:**
  - Secure login and registration forms.
  - Role assignment upon registration.
  - Password reset functionality.
- **Security Measures:**
  - Form validation.
  - Secure password storage.
  - Authentication protection for routes.

## Technologies Used
- **Frontend:** React
- **Backend:** PHP (via XAMPP)
- **Database:** MySQL
- **Other Tools:** XAMPP for local development

## Installation Guide

### Prerequisites
Make sure the following tools are installed on your system:
- [Node.js](https://nodejs.org/)
- [XAMPP](https://www.apachefriends.org/index.html)

### Backend Setup
1. Start the XAMPP Control Panel and ensure that **Apache** and **MySQL** are running.
2. Import the database:
   - Open **phpMyAdmin** at `http://localhost/phpmyadmin/`.
   - Create a new database (e.g., `auth_system`).
   - Import the provided `auth_system.sql` file into the newly created database.
3. Configure database settings in `backend/config.php`:
   ```php
   <?php
   define('DB_HOST', 'localhost');
   define('DB_USER', 'root');
   define('DB_PASS', '');
   define('DB_NAME', 'auth_system');
   ?>
   ```
4. Place the backend files in the `htdocs` directory of XAMPP (`C:\xampp\htdocs\auth_system`).

### Frontend Setup
1. Navigate to the project directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The React app will be available at `http://localhost:3000/`.

## Project Structure
```
root
├── backend          # PHP backend files
├── frontend          # React frontend files
└── database          # SQL dump file for initial setup
```

## Usage
1. **Register a new user:**
   - Navigate to the registration page.
   - Fill out the form and select the desired role (User, Admin, or Super Admin).
2. **Login:**
   - Access the login page and provide your credentials.
   - Users will be redirected to the appropriate dashboard based on their role.
3. **Reset Password:**
   - Click the "Forgot Password" link on the login page.
   - Enter the registered email to receive reset instructions.

## Roles and Dashboards
| Role        | Description                       |
|-------------|-----------------------------------|
| **User**    | Standard user dashboard access.   |
| **Admin**   | Admin dashboard and tools.       |
| **Super Admin** | Full application management. |



