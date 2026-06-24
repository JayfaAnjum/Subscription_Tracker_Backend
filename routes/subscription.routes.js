import {Router} from "express"
import { createSubscription, deleteUserSingleSubscription, getUserSubscripitions } from "../controllers/subscription.controller.js"
import { authenticate } from "../middleware/auth.middleware.js"

const subscriptionRouter = Router()


subscriptionRouter.get("/:id",authenticate,getUserSubscripitions)
subscriptionRouter.post("/",authenticate,createSubscription)
subscriptionRouter.delete("/:id",authenticate,deleteUserSingleSubscription)

export default subscriptionRouter