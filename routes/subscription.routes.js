import {Router} from "express"
import { createSubscription, getUserSubscripitions } from "../controllers/subscription.controller.js"
import { authorize } from "../middleware/auth.middleware.js"

const subscriptionRouter = Router()


subscriptionRouter.get("/:id",authorize,getUserSubscripitions)
subscriptionRouter.post("/",authorize,createSubscription)
subscriptionRouter.put("/:id")
subscriptionRouter.delete("/:id")

export default subscriptionRouter