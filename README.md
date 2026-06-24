# Subscription Tracker API

A backend API for managing subscriptions and sending automated renewal reminders.
https://jayfacsc-6836712.postman.co/workspace/SubscriptionAPI~cef02ec8-fe89-4ae8-8b7e-f917c9784221/collection/55533000-d2423f0c-4923-43d1-bbbc-ed5b4b2b9003?action=share&source=copy-link&creator=55533000

##  Features

- User Authentication (JWT)
- Subscription CRUD Operations
- Automated Email Reminders
- Background Job Processing with Upstash QStash
- Arcjet Bot Protection & Security
- MongoDB Transactions
- MongoDB Replica Set Support (Development)
- Centralized Error Handling
- RESTful API Architecture

##  Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Nodemailer
- Upstash QStash
- Arcjet

## Installation

```bash
npm install
npm run dev
npx @upstash/qstash-cli dev(another terminal for test qstash workflow locally)
```

##  Environment Variables

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
