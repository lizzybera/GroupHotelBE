import express, { Request, Response } from "express";
import { HTTP } from "../error/mainError";
import roomModel from "../model/roomModel";
import cloudinary from "../config/cloudinary";
import adminModel from "../model/adminModel";
import mongoose from "mongoose";

export const createRoom = async (req: any, res: Response) => {
  try {
    const {adminID} = req.params
    const {
        roomSize,
        bedSize,
        Guest,
        roomType,
        description,
        amount
    } = req.body;

    const admin : any = await adminModel.findById(adminID)    
    
    const { secure_url, public_id } = await cloudinary.uploader.upload(
        req.file?.path
        ); 
        
        const roomed : any = await roomModel.create({
            roomSize,
            bedSize,
            Guest,
            roomType,
            description,
            amount,
            isAvailable : true,
            roomPics : secure_url,
            roomPicsID : public_id,
        });
  

        admin?.room?.push(new mongoose.Types.ObjectId(roomed._id!))
        admin?.save()


    res.status(HTTP.OK).json({
      message: "room Created",
      data: roomed,
    });
  } catch (error : any) {
    res.status(HTTP.BAD_REQUEST).json({
      message: "Error creating room",
      data:error.message
    });
  }
};

export const viewRooms = async (req: Request, res: Response) => {
  try {
    const room = await roomModel.find();

    res.status(HTTP.OK).json({
      message: "All rooms",
      data: room,
    });
  } catch (error : any) {
    res.status(HTTP.BAD_REQUEST).json({
      message: "Error viewing rooms",
    });
  }
};

export const updateRoom = async (req: Request, res: Response) => {
  try {
    const { roomID } = req.params;
    
    const room = await roomModel.findByIdAndUpdate(roomID, {isAvailable : true}, {new : true});

    res.status(HTTP.OK).json({
      message: "room updated",
      data: room,
    });
  } catch (error : any) {
    res.status(HTTP.BAD_REQUEST).json({
      message: "Error updating room",
    });
  }
};

export const viewOneRoom = async (req: Request, res: Response) => {
  try {
    const { roomID } = req.params;
    const room = await roomModel.findById(roomID);

    res.status(HTTP.OK).json({
      message: "viewing one room",
      data: room,
    });
  } catch (error : any) {
    res.status(HTTP.BAD_REQUEST).json({
      message: "Error viewing one room",
    });
  }
};

