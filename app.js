import { config } from "dotenv";
import express from "express"
import {PORT} from "./config/env.js"
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDatabase from "./config/mongodb.js";
import errorMiddleWare from "./middleware/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middleware/arcjet.middlware.js";
import workflowRouter from "./routes/workflow.routes.js";

const app = express()

app.use(arcjetMiddleware)
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use("/api/v1/users",userRouter)
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/subscriptions",subscriptionRouter)
app.use("/api/v1/workflows",workflowRouter)
app.use(errorMiddleWare)

app.listen(PORT,()=>{
console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);
connectToDatabase()
})


export default app;


// User buys subscription
//         ↓
// Backend API
//         ↓
// Send message to QStash
//         ↓
// Return success immediately
//         ↓
// QStash stores message
//         ↓
// QStash calls your Email API
//         ↓
// Email sent
