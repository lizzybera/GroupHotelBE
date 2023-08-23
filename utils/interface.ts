import mongoose from "mongoose";

export interface iUser {
    fullName?: string;
    email?: string;
    password?: string;
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
      companyPicsID : string,
    room : {} []
  }
  

  export interface iRoom {
    roomSize : string,
    bedSize : string,
    Guest : string,
    roomType : string,
    description : string,
    amount : number,
    isAvailable : boolean,
    roomPics : string,
    roomPicsID : string,
    admin : {},
    book:[]
}

export interface iBook{
    time?:string,
    userId?:string
    room?:{},
}

export interface iBookData extends iBook, mongoose.Document{}


  export interface iAdminData extends iAdmin, mongoose.Document {}
  
  export interface iUserData extends iUser, mongoose.Document {}

  export interface iRoomData extends iRoom, mongoose.Document {}
