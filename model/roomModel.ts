import mongoose from "mongoose";
import { iRoom, iRoomData } from "../utils/interface";

const roomModel = new mongoose.Schema<iRoom>({
    roomSize : {
        type : String
    },
    bedSize : {
        type : String,
        unique : true
    },
    Guest : {
        type : String
    },
    roomType : {
        type : String,
    },
    description : {
        type : String,
    },
    roomPics : {
        type : String,
    },
    roomPicsID : {
        type : String,
    },
    amount : {
        type : Number
    },
    isAvailable : {
        type : Boolean 
    },
    admin : {
        type : mongoose.Types.ObjectId,
        ref : "admins"
    },
    book:[{
        type : mongoose.Types.ObjectId,
        ref : "books"
    }]
}, {timestamps : true})

export default mongoose.model<iRoomData>("rooms", roomModel)