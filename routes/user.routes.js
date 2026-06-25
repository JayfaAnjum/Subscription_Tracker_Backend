import {Router} from "express"
import { getUserProfile,updateUser,deleteUser} from "../controllers/user.controller.js"
import { authenticate} from "../middleware/auth.middleware.js"

const userRouter = Router()

userRouter.get("/:id",authenticate,getUserProfile)
userRouter.put("/:id",authenticate,updateUser)
userRouter.delete("/:id",authenticate,deleteUser)

export default userRouter