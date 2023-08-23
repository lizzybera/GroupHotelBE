import mongoose from "mongoose";
import { iUser, iUserData } from "../utils/interface";


const userModel = new mongoose.Schema<iUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      toLowerCase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    avatar: {
      type: String,
    },
    avatarUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<iUserData>("users", userModel);
