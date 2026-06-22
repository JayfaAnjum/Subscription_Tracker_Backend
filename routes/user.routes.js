import {Router} from "express"
import { getUser, getUsers } from "../controllers/user.controller.js"

const userRouter = Router()

userRouter.get("/",getUsers)
userRouter.get("/:id",getUser)
userRouter.post("/")
userRouter.put("/:id")
userRouter.delete("/:id")

export default userRouter