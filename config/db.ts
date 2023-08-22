import mongoose from 'mongoose';
import dotenv from "dotenv"
dotenv.config()


// const URL = "process.env.DB"
export const dbConnect = () => {
    mongoose.connect(process.env.DB!).then(() => {
        console.log("Connected to database")
    })
}

