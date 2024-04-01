import mongoose from 'mongoose';

const connectToMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("mongodb connected");
    } catch (error) {      
        throw error; 
    }
};

export default connectToMongo;