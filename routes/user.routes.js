import {Router} from "express"
import { getUser, getUsers } from "../controllers/user.controller.js"
import { authenticate, authorizeAdmin } from "../middleware/auth.middleware.js"

const userRouter = Router()

userRouter.get("/:id",authenticate,getProfile)
userRouter.put("/:id",authenticate,updateUser)
userRouter.delete("/:id",authenticate,deleteUser)

export default userRouter