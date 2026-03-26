# 📚 Book Catalog API

A fully functional **RESTful API** built using **Node.js, Express, and MongoDB** that allows users to register, login, and perform CRUD operations on books with secure JWT authentication.

---

## 🚀 Live API

🔗 https://bookapi-ggy7.onrender.com

---

## 📌 Features

* 🔐 User Registration & Login (JWT Authentication)
* 🔑 Password hashing using bcrypt
* 📚 Full CRUD operations on Books
* 🔒 Protected routes using middleware
* 👤 User-specific book ownership
* 🚫 Duplicate book prevention
* ⚡ Rate limiting for security
* ❌ Centralized error handling
* 🧱 Clean MVC architecture

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Mongoose)
* **Authentication:** JWT (jsonwebtoken)
* **Security:** bcryptjs, express-rate-limit
* **Deployment:** Render

---

## 📂 Project Structure

```
book-api/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── userController.js
│   └── bookController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   └── Book.js
│
├── routes/
│   ├── userRoutes.js
│   └── bookRoutes.js
│
├── utils/
│   └── generateToken.js
│
├── Server.js
├── package.json
```

---

## 🔐 Authentication

JWT-based authentication is used.

Add token in header:

```
Authorization: Bearer <your_token>
```

---

## 📡 API Endpoints

### 👤 User Routes

**Register User**

```
POST /api/users/register
```

**Login User**

```
POST /api/users/login
```

---

### 📚 Book Routes

**Create Book (Protected)**

```
POST /api/books
```

**Get All Books (Public)**

```
GET /api/books
```

**Get Book by ID (Public)**

```
GET /api/books/:id
```

**Update Book (Protected)**

```
PUT /api/books/:id
```

**Delete Book (Protected)**

```
DELETE /api/books/:id
```

---

## 🧪 Testing (Postman)

1. Register a user
2. Login and get JWT token
3. Add token in Authorization header
4. Test protected routes

---

## ⚙️ Environment Variables

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## 🔒 Security Features

* Password hashing using bcrypt
* JWT token authentication
* Rate limiting (prevents brute force attacks)
* Protected routes with middleware

---

## 🚫 Duplicate Prevention

Users cannot create duplicate books:

Same title + author + user → Not allowed

---




## 👨‍💻 Author

**Bhushan Bhomkar**

---

## ⭐ Acknowledgement

This project was built as part of a backend development assignment to demonstrate real-world API design and implementation.

---

## 📄 License

This project is open-source and available for learning purposes.
