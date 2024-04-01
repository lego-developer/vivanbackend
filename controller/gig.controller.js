import createError from "../utils/createError.js"
import Gig from "../models/gig.model.js"

export const createGig = async (req, res, next) => {
    if (!req.isSeller) return next(createError(403, "only seller can create gig"))
    const newGig = new Gig({
        userId: req.userId, ...req.body
    })
    try {
        const savedGig = await newGig.save()
        res.status(201).json(savedGig)
    } catch (error) {
        next(error)
    }
}
export const deleteGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id)
        if (gig.userId !== req.userId) {
            return next(createError(403, "you can delete only your gig"))
        }
        await Gig.findByIdAndDelete(req.params.id)
        res.status(200).send("gig has been deleted")
    } catch (error) {

    }
}
export const getGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id)
        if (!gig) return next(createError(404, "gig not found"))
        res.status(200).send(gig)
    } catch (error) {

    }
}
export const getGigs = async (req, res, next) => {
    const q = req.query
    // const filters = {
    //     cat: q.cat,
    //     price: { $gt: q.price },
    //     title: { $regex: q.search, $options: "i" }
    // }
    const filters = {
        ...(q.userId && { userId: q.userId }),
        ...(q.cat && { cat: q.cat }),
        ...(q.search && { title: { $regex: q.search, $options: "i" } }),
        ...((q.min || q.max) && { price: { ...(q.min && { $gt: q.min }), ...(q.max && { $lt: q.max }) } })
    }

    try {
        const gigs = await Gig.find(filters).sort({ [q.sort]: -1 }) // q.sort == createdAt/sales
        res.status(200).send(gigs)
    } catch (error) {

    }
}

export const myGigs = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const gigs = await Gig.find({ userId: userId });
        res.status(200).json(gigs);
    } catch (error) {

    }
}

