import mongoose from "mongoose";

interface iAuthor {
    name? : string;
    email? : string;
    password? : string;
    image? : string;
    imageID? : string;
}

export interface iAuthorData extends iAuthor, mongoose.Document {}


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