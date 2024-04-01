import mongoose from 'mongoose';
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    gigId: {
        type: String,
        required: true
    },
    userId:{
        type:String,
        required:true
    },
    star:{
        type:Number,
        required:true,
        enum:[1,2,3,4,5] // star 1 or 2 or 3 or 4 or 5
    },
    desc:{
        type:String,
        required:true
    }

}, { timestamps: true });

export default mongoose.model("Review", ReviewSchema)