import useryoutube from "../models/useryoutube.js"
import bcrypt from "bcrypt" // npm i bcrypt --> for password bcryption and dcryption
import jwt from "jsonwebtoken"
import createError from "../utils/createError.js"

export const register = async (req, res, next) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 5) //The higher the value of the salt rounds, the more secure but slower the hashing process.
        const newUser = new useryoutube({
            ...req.body, // add all datas including password
            password: hash, // after adding all rewrite password

        })
        await newUser.save()
        res.status(201).send("new user registered")
    } catch (error) {
        next(error)
    }
}
export const login = async (req, res, next) => {

    try {
        const user = await useryoutube.findOne({ username: req.body.username })
        if (!user) return next(createError(404, "User not found"))

        const isCorrect = bcrypt.compareSync(req.body.password, user.password)
        if (!isCorrect) return next(createError(400, "wrong password or username"))

        const token = jwt.sign({
            id: user._id,
            isSeller: user.isSeller
        }, process.env.JWT_KEY) //process.env.JWT_KEY is secret key

        const { password, ...info } = user._doc // taking password outside for sending // if user then all details send  including password other details which is not in out db documnet // if user._doc then only datas in document except pasword
        res.cookie("accessToken", token, { httpOnly: true }).status(200).send(info)

    } catch (error) {
        next(error)
    }

}
export const logout = async (req, res, next) => {
    try {
        res.clearCookie('accessToken', { httpOnly: true, sameSite: "none", secure: true });
        res.status(200).send("Logout successful");
    } catch (error) {
        next(error) 
    }
}

