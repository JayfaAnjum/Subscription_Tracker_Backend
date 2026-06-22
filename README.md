# Subscription Tracker API

A backend API for managing subscriptions and sending automated renewal reminders.

## 🚀 Features

- User Authentication (JWT)
- Subscription CRUD Operations
- Automated Email Reminders
- Background Job Processing with Upstash QStash
- Arcjet Bot Protection & Security
- MongoDB Transactions
- MongoDB Replica Set Support (Development)
- Centralized Error Handling
- RESTful API Architecture

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Nodemailer
- Upstash QStash
- Arcjet

## 📦 Installation

```bash
npm install
npm run dev
```

## 🔧 Environment Variables

```env
PORT=5000
NODE_ENV='development'
MONGODB_URI=mongodb://localhost:27017/subscriptionDB?replicaSet=rs0
JWT_SECRET=secret
JWT_EXPIRES_IN=1d
ARCJET_KEY=
ARCJET_ENV=development
SERVER_URL=http://localhost:5000
QSTASH_URL=http://127.0.0.1:8080
QSTASH_TOKEN=
EMAIL_PASSWORD=

```
