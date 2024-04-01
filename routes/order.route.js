import express from "express"
import { createOrder,getOrders } from "../controller/order.controller.js"
import { verifyToken } from "../middleware/jwt.js"

const router = express.Router()

router.post("/:gigId", verifyToken, createOrder)
router.get("/", verifyToken, getOrders)


export default router