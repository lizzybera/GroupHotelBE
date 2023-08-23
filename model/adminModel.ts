import mongoose from "mongoose";

export interface iAdmin {
    companyName : string,
    companyEmail : string,
    companyAddress : string,
    passWord : string,
    companyPhoneNo : number,
    companyPics : string,
    companyPicsID : string
}

export interface iAdminData extends iAdmin, mongoose.Document {}

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