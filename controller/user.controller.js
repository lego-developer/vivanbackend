// import jwt from "jsonwebtoken";
// import useryoutube from "../models/useryoutube.js"

// export const deleteUser = async (req, res) => {
//     // const user = await useryoutube.findById(req.params.id)
//     //console.log(user)
//     const token = req.cookies.accessToken;

//     if (!token) return res.status(401).send("you are not authenticated")

//     jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
//         if (payload.id !== req.params.id) {
//             return res.status(403).send("you can delete only your account")
//         }
//         await useryoutube.findByIdAndDelete(req.params.id)
//         res.status(200).send("account deleted")
//         //res.send(user)
//     })


// }


import useryoutube from "../models/useryoutube.js"
import createError from "../utils/createError.js"

export const deleteUser = async (req, res, next) => {

    const user = await useryoutube.findById(req.params.id)
    if (req.userId !== user._id.toString()) {
        return next(createError(403, "You can delete only your account"))
    }
    await useryoutube.findByIdAndDelete(user._id.toString())
    res.status(200).send("account deleted")

}

export const getUser = async (req, res, next) => {


    const user = await useryoutube.findById(req.params.id)

    res.status(200).send(user)

} 


export const getSellers = async (req, res, next) => {


    const users = await useryoutube.find({isSeller:true})
     res.status(200).send(users)

}


// export const getUsers = async(req,res,next) =>{



//         console.log("hello")

//         //  const allUsers = await useryoutube.find({ isSeller: true })
//         // res.send(req)


// }