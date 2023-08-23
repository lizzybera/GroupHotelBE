import mongoose from "mongoose";

export interface iUser {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    city?: string;
    phoneNumber?: number;
    localGovernment?: string;
    avatar?: string;
    avatarUrl?: string;
  }
  
  export interface iUserData extends iUser, mongoose.Document {}
