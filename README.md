# Dynamic Portfolio Backend API

This is the backend API for a **Dynamic Portfolio Website**, built with **Node.js**, **Express**, and **MongoDB**. It supports admin-protected CRUD operations for personal projects, skills, experience, image uploads, contact form with email notifications, and database backups.

---

##  Features

-  Admin Authentication (JWT)
-  Contact Form with Email Notifications
-  Skills, Experience, Projects Modules
-  Image Upload with Multer
-  Admin Profile Settings (Name, Email, Password update)
-  Password Reset with Email Verification
-  Protected Routes for Admin Only
-  Database Backup using `mongodump`
-  Swagger API Documentation
-  Middlewares (Rate Limiting, Logging, Error Handling)

---

##  Project Structure

```
backend/
├── config/            # DB config, Email setup, Swagger setup
├── controllers/       # Route logic for all modules.
├── middleware/        # Auth, rate limiting, etc.
├── models/            # Mongoose schemas
├── routes/            # API route definitions
├── backup.js          # Script to generate DB backup
├── server.js          # Entry point
└── .env               # Environment variables
```

---

##  Environment Variables (`.env`)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=deeparv_secret_token
EMAIL_USER=deeparv296@gmail.com
EMAIL_PASS=rbja tisp bwdk fjmo
```

---

## API Documentation (Swagger)

After running the server, visit:

 [http://localhost:5000/api-docs](http://localhost:5000/api-docs)

To test and explore all API endpoints using Swagger UI.

---

##  Installation & Run

1. **Clone the repo:**

```bash
git clone https://github.com/deepikaverma2906/portfolio-backend.git
cd portfolio-backend/backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Setup `.env` file** (see above)

4. **Run the server:**

```bash
npm start
```

---

##  Image Upload Support

- Uploads are handled using **Multer**
- Images are saved in `/uploads` folder or optionally on cloud storage
- API supports adding image, skills, projects, experience, etc.

---

##  Database Backup

Use this script to backup the MongoDB database:

```bash
node backup.js
```

Output will be saved inside to the path defined inside the script.

---

##  Contact Form

- Saves messages to DB
- Sends email to admin
- Sends “Thank you” email to sender

---

##  Future Scope

- Admin Dashboard UI
- Email verification on registration
- Frontend integration (Angular)

---

##  License

This project is open-source and free to use.

---
