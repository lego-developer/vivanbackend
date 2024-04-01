import express from "express";
import dotenv from "dotenv"
import connectToMongo from "./config/mongoDB.js"
import connectToSql from "./config/sqlDB.js";

import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"



const app = express()
dotenv.config()

//middlewares 
app.use(cors({  origin: "http://localhost:5173", credentials: true })) // connecting fronend to backend
app.use(express.json()) // if not added , error while sending datas from client ot server
app.use(cookieParser()) // for cookie parser

app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/gigs", gigRoute)
app.use("/api/orders", orderRoute)
app.use("/api/conversations", conversationRoute)
app.use("/api/messages", messageRoute)
app.use("/api/reviews", reviewRoute)

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Internal Server Error"
    return res.status(errorStatus).send(errorMessage)
})


app.listen(8800, () => {
    connectToMongo()
    connectToSql()
    console.log("server connected")
})
