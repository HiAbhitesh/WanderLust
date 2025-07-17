# 🌍 WanderLust - Travel & Listing Platform

**WanderLust** is a full-stack travel application that allows users to create, manage, and explore travel destinations with secure authentication and image uploads.

Built with **Node.js**, **Express.js**, and **MongoDB**, following MVC architecture for clean code organization.

---

## 🚀 Key Features

### User System
- Secure registration & login (Passport.js local strategy)
- Password hashing (bcrypt)
- Protected routes with middleware
- Flash messages for user feedback

### Listings Management
- CRUD operations for travel listings
- Image uploads via Cloudinary
- Server-side form validation (Joi)
- Responsive EJS templates

### Technical Features
- RESTful routing
- Error handling middleware
- Environment variables (dotenv)
- MVC architecture

---

## 🛠️ Tech Stack

| Category        | Technologies                          |
|-----------------|---------------------------------------|
| Frontend        | EJS, CSS, JavaScript                  |
| Backend         | Node.js, Express.js                   |
| Database        | MongoDB (Mongoose ODM)                |
| Authentication  | Passport.js                           |
| File Uploads    | Multer + Cloudinary                   |
| Validation      | Joi                                   |
| Security        | Helmet, sanitize-html                 |

---

## 📁 Project Structure

WanderLust/
├── controllers/ # Route controllers
├── models/ # Mongoose models
├── public/ # Static assets
│ └── stylesheets/ # CSS files
├── routes/ # Express routers
├── utils/ # Utilities
├── views/ # EJS templates
│ ├── listings/ # Listing pages
│ ├── partials/ # Reusable components
│ └── users/ # Auth pages
├── app.js # Main application
├── cloudConfig.js # Cloudinary config
├── middleware.js # Custom middleware
├── schema.js # Joi validation
└── package.json # Dependencies


---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account or local MongoDB
- Cloudinary account

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/HiAbhitesh/WanderLust.git
   cd WanderLust

### Install dependencies:
npm install

### Create .env file:
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/wanderlust
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SESSION_SECRET=your_session_secret

### Start the server:
node app.js

### Access the app at: http://localhost:8080
