import mongoose from "mongoose";
import { iBook, iBookData } from "../utils/interface";

const bookModel = new mongoose.Schema<iBook>({
    time:{
        type:String,
        required:true,
    },
    userId:{
        type:String
    },
    room:[{
        type:mongoose.Types.ObjectId,
        ref:"rooms"
    }]
},
{timestamps:true}
)

export default mongoose.model<iBookData>("books", bookModel)