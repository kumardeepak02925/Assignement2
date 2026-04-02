frontend----->cd app-->use cmd---npm run dev
backend------>cd backend--->node server.js



# 🎓 Student Management System (MERN Stack)

## 🚀 Project Overview

This is a full-stack Student Management System built using the MERN stack (MongoDB, Express.js, React.js, Node.js).
It includes authentication, role-based access control, and student data management.

---

## 🛠️ Tech Stack

* Frontend: React (Vite) + Tailwind CSS
* Backend: Node.js + Express.js
* Database: MongoDB
* Authentication: JWT (JSON Web Token)

---

## 🔐 Features

### 👤 Authentication

* User Registration (Signup)
* User Login
* Password hashing using bcrypt
* JWT-based authentication

---

### 🛡️ Authorization

* Role-based access control

  * Admin
  * Normal User

---

### 🎓 Student Management

#### 👀 Normal User

* View all student records

#### 👑 Admin User

* View all students
* Update student details

---

### 🔒 Security

* Protected routes using JWT middleware
* Secure password storage (bcrypt)

---

## 📡 API Endpoints

### 🔐 Auth Routes

* POST `/api/auth/register` → Register user
* POST `/api/auth/login` → Login user

### 🎓 Student Routes

* GET `/api/student` → Get all students (Protected)
* PUT `/api/student/:id` → Update student (Admin only)

---

## 💻 Frontend Features

* Modern UI using Tailwind CSS
* Login & Registration pages
* Dashboard with student list
* Role-based UI rendering
* Sidebar + Navbar design

---

## ⚙️ Installation

### 1️⃣ Clone Repository

```bash
git clone https://github.com/kumardeepak02925/your-repo.git
cd your-repo
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 Environment Variables

Create `.env` file in backend:

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 📊 Project Structure

```
backend/
  ├── models/
  ├── routes/
  ├── controllers/
  ├── middleware/

frontend/
  ├── src/
  ├── components/
  ├── pages/
```

---

## 🎯 Future Improvements

* Add Delete Student feature
* Add Search & Filter
* Add Pagination
* Add Profile Management
* Deploy on cloud (AWS / Vercel)

---

## 👨‍💻 Author

Deepak Kumar

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub
