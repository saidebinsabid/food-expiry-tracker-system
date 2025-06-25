# 🥗 EcoFridge

A full-stack web application that helps users track food items, receive expiry alerts, and reduce food waste. Built using **React**, **Firebase Authentication**, **Express.js**, and **MongoDB**, this system ensures secure, intuitive, and mobile-responsive food management.

---

## 🌐 Live Demo

👉 [Click here to view the live site](https://ecofridge.netlify.app/)

---

## 📌 Project Overview

This app enables users to:
- Add food items with expiry dates
- View nearly expired and expired items
- Update or delete their items
- Add personal notes
- Get a countdown till expiry
- Authenticate securely using Firebase and JWT

It's designed with user experience, responsiveness, and real-world use in mind, supporting seamless food inventory tracking for any household or organization.

---

## ✅ Key Features

- 🔐 **Authentication System**
  - Email/password-based login & registration via Firebase
  - JWT Firebase token secured backend with protected routes
  - Google login option

- 🧾 **Add Food (Private Route)**
  - Add food details (image, name, category, quantity, expiry date, etc.)
  - Stored data linked to the logged-in user

- 🧊 **Fridge Page**
  - Shows all food items in card format
  - Search and filter by category
  - Expired badge display and “See Details” button

- 📉 **Nearly Expiry Section**
  - Auto-fetches items expiring within the next 5 days

- 💀 **Expired Food Section**
  - Lists all food that has already expired

- 📌 **Food Details Page**
  - Displays full food data
  - Expiration countdown
  - Authenticated users can leave notes
  - Notes are stored with posted date

- 📋 **My Items Page (Private Route)**
  - Table layout of user’s added items
  - Update modal form
  - Confirmation modal for delete

- ⚙️ **Extra Sections**
  - Food management best practices
  - Framer motion-based animation for enhanced UI

- 🔍 **Search & Filter**
  - Search by title/category
  - Filter dropdown to enhance user experience

- ⏱️ **React CountUp**
  - Shows number of expired and nearly expired items dynamically

- 🚨 **404 Page + Loading Spinners**
  - Proper error page for unknown routes
  - Spinners shown during data load

- 📱 **Fully Responsive**
  - Mobile, tablet, and desktop responsive

---

## 🔧 Tech Stack

### Client:
- **React.js**
- **React Router**
- **Tailwind CSS**
- **Framer Motion**
- **SweetAlert2 / React Toastify**
- **Firebase Authentication**
- **Axios**

### Server:
- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **JWT for Authorization**
- **CORS / Dotenv**

---

## 🔐 Security

- Firebase config is stored in `.env.local`
- MongoDB URI and JWT secret are securely stored in environment variables
- All sensitive POST, PATCH, DELETE routes are protected using JWT

---

## 📦 NPM Packages Used

```bash
axios
firebase
react-router-dom
react-countup
sweetalert2
FirebaseaccessToken
cors
dotenv
express
mongoose
```
---
## 🚀 How to Run Locally

**1. Clone the repo:**

```bash
git clone https://github.com/your-username/ecofridge.git
cd food-expiry-tracker-system
```
**2. Install frontend dependencies:**

```bash
npm install
```
**3. Clone the backend repo:**

```bash
git clone https://github.com/your-username/ecofridge.git
cd food-expiry-tracker-system-server
```
**4. Install backend dependencies:**

```bash
npm install
```
**4. Set up environment variables:** 
- Create a `.env.local` file inside the `/client` directory and add your Firebase config:
```bash
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```
- Create a `.env` file inside the `/server` directory and add the following:

```bash
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_jwt_secret
```
**5. Run the backend server:**
```bash
cd food-expiry-tracker-system-server
nodemon index.js
```

**6. Run the frontend client:**
```bash
cd food-expiry-tracker-system
npm run dev
```
