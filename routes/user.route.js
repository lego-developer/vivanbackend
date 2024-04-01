import express from "express"
import { deleteUser, getUser ,getSellers} from "../controller/user.controller.js"
import { verifyToken } from "../middleware/jwt.js"

const router = express.Router()

router.delete("/:id", verifyToken, deleteUser)
router.get("/:id", getUser) // verifyToken removed from here
router.get("/sellers//",getSellers) // "/sellers//" because /:id and /sellers/ works as same
// router.get("/hello", getUsers) 

export default router