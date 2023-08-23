import express, { Request, Response } from "express";
import { HTTP } from "../error/mainError";
import adminModel from "../model/adminModel";
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary";

export const createAdmin = async (req: any, res: Response) => {
  try {
    const {
      companyName,
      companyEmail,
      companyAddress,
      companyPhoneNo,
      passWord,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(passWord, salt);

    const { secure_url, public_id } = await cloudinary.uploader.upload(
      req.file?.path
    );

    const admin = await adminModel.create({
      companyName,
      companyEmail,
      companyAddress,
      companyPhoneNo,
      passWord: hash,
      companyPics: secure_url,
      companyPicsID: public_id,
    });


    res.status(HTTP.OK).json({
      message: "Admin Created",
      data: admin,
    });
  } catch (error : any) {
    res.status(HTTP.BAD_REQUEST).json({
      message: "Error creating Admin",
      data:error.message
    });
  }
};

export const signInAdmin = async (req: Request, res: Response) => {
  try {
    const { companyEmail, passWord } = req.body;

    const admin = await adminModel.findOne({ companyEmail });

    if (admin) {
      const passed = await bcrypt.compare(passWord, admin?.passWord!);

      if (passed) {
        res.status(HTTP.CREATE).json({
          message: `Welcome ${admin.companyName}`,
          data: admin?._id,
        });
      } else {
        res.status(HTTP.BAD_REQUEST).json({
          message: "incorrect password",
        });
      }
    } else {
      res.status(HTTP.BAD_REQUEST).json({
        message: "Admin not Found",
      });
    }
  } catch (error : any) {
    res.status(HTTP.BAD_REQUEST).json({
      message: "Error finding Admin",
      data:error.message
    });
  }
};

export const viewAdmins = async (req: Request, res: Response) => {
  try {
    const admin = await adminModel.find();

    res.status(HTTP.OK).json({
      message: "All Admins",
      data: admin,
    });
  } catch (error : any) {
    res.status(HTTP.BAD_REQUEST).json({
      message: "Error viewing Admins",
    });
  }
};

export const viewOneAdmin = async (req: Request, res: Response) => {
  try {
    const { adminID } = req.params;
    const admin = await adminModel.findById(adminID);

    res.status(HTTP.OK).json({
      message: "viewing Admin",
      data: admin,
    });
  } catch (error : any) {
    res.status(HTTP.BAD_REQUEST).json({
      message: "Error viewing Admins",
    });
  }
};
