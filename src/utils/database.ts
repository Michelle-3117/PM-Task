import mongoose from "mongoose";
import logger from 'logger'

const URL = process.env.MONGO_URI as string;
export const connectDb = async () => {
    try {
        await mongoose.connect(URL).then(() => console.log('database connected successfully'));
        
    } catch (error) {
        console.log(`database was unable to connect: ${error}`);
        
    }
}
