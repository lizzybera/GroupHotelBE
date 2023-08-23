import mongoose from "mongoose";

export interface iUser {
    fullName?: string;
    email?: string;
    password?: string;
    city?: string;
    phoneNumber?: number;
    avatar?: string;
    avatarUrl?: string;
  }


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
  
  export interface iUserData extends iUser, mongoose.Document {}
