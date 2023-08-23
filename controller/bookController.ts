import mongoose from "mongoose";
import { HTTP } from "../error/mainError";
import { Request, Response } from "express";
import bookModel from "../model/bookModel";
import roomModel from "../model/roomModel";

export const createBook = async (req: any, res: Response) => {
  try {
    const { userId, roomId } = req.params;
    const { time } = req.body;

    const booked: any = await bookModel.create({
      time,
      userId,
    });
const room:any =await roomModel.findById(roomId)
    room?.book?.push(new mongoose.Types.ObjectId(booked._id!));
    room?.save();

    res.status(HTTP.OK).json({
      message: "booked successfully",
      data: booked,
    });
  } catch (error: any) {
    res.status(HTTP.BAD_REQUEST).json({
      message: "Error booking room",
      data: error.message,
    });
  }
};
