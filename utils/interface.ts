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
    city?: string;
    phoneNumber?: number;
    avatar?: string;
    avatarUrl?: string;
  }
  
  export interface iUserData extends iUser, mongoose.Document {}