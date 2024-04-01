import createError from "../utils/createError.js"
import Review from "../models/review.model.js"
import Gig from "../models/gig.model.js"

export const createReview = async (req, res, next) => {

    if (req.isSeller) return next(createError(403, "Seller cant create review !"))
    const newReview = new Review({
        userId: req.userId,
        gigId: req.body.gigId,
        desc: req.body.desc,
        star: req.body.star,
    }) // this is outside of try because it is not async

    try {

        const review = await Review.findOne({ gigId: req.body.gigId, userId: req.userId })
        if (review) return next(createError(403, "you have already created a review for this gig")) // need to check whether the review creating user has purchased this gig -> do last if time get 
        const savedReview = await newReview.save()
        await Gig.findByIdAndUpdate(req.body.gigId, { $inc: { totalStars: req.body.star, starNumber: 1 } })
        res.status(201).send(savedReview)

    } catch (error) {
        next(error)
    }
}
export const getReviews = async (req, res, next) => {
    try {

        const reviews = await Review.find({ gigId: req.params.gigId })
        res.status(200).send(reviews)

    } catch (error) {
        next(error)
    }
}
export const deleteReview = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}
