import mongoose from 'mongoose';
import dotenv from "dotenv"
dotenv.config()

export const dbConnect = () => {
    mongoose.connect(process.env.DB!).then(() => {
        console.log("Connected to database")
    })
}

