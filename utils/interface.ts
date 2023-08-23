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
  
  export interface iUserData extends iUser, mongoose.Document {}
