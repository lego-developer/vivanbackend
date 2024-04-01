import express from "express"
import { createGig, deleteGig, getGig, getGigs ,myGigs } from "../controller/gig.controller.js"
import { verifyToken } from "../middleware/jwt.js"

const router = express.Router()

router.post("/", verifyToken, createGig)

router.delete("/:id", verifyToken, deleteGig)

router.get("/single/:id",  getGig)

router.get("/", getGigs)

router.get("/mygigs/:id",myGigs)

export default router