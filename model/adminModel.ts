import mongoose from "mongoose";
import { iAdmin, iAdminData } from "../utils/interface";


const adminModel = new mongoose.Schema<iAdmin>({
    companyName : {
        type : String
    },
    companyEmail : {
        type : String,
        unique : true
    },
    companyAddress : {
        type : String
    },
    passWord : {
        type : String,
        trim : true
    },
    companyPhoneNo : {
        type : Number,
    },
    companyPics : {
        type : String
    },
    companyPicsID : {
        type : String
    },
})

export default mongoose.model<iAdminData>("admins", adminModel)