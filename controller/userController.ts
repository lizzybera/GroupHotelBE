import { Request, Response } from "express";
import userModel from "../model/userModel";
import bcrypt from "bcrypt";
import cloudinary from "../Config/cloudinary";

export const createUser = async (req: any, res: Response) => {
  try {
    const {
      fullName,
      password,
      email,
      phoneNumber,
      confirmPassword,
      city,
      localGovernment,
    } = req.body;

    const salt:any = await bcrypt.genSalt(10);
    const hash:any = await bcrypt.hash(password, salt);

    const {secure_url, public_id} =await cloudinary.uploader.upload(req.file?.path)

    if (password !== confirmPassword) {
      return res.status(404).json({
        message: "input the right password",
      });
    }

    const user = await userModel.create({
      fullName,
      password: hash,
      email,
      phoneNumber,
      confirmPassword: hash,
      city,
      localGovernment,
      avatar:secure_url,
      avatarUrl: public_id
    });
    return res.status(201).json({
      message: "user created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error creating user",
      data: error.message,
    });
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const hash = await bcrypt.compare(password, user?.password!);
    if (user) {
      if (hash) {
        return res.status(201).json({
          message: `welcome ${user.fullName} great to have you onBoard`,
          data: user._id,
        });
      } else {
        return res.status(403).json({
          message: "user credentials are invalid",
        });
      }
    } else {
      return res.status(403).json({
        message: "user not found",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "error signing in user",
      data: error.message,
    });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { localGovernment, phoneNumber, city } = req.body;
    const user = await userModel.findByIdAndUpdate(
      id,
      { localGovernment, phoneNumber, city },
      { new: true }
    );
    return res.status(201).json({
      message: "user updated successfully",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "error updating user",
      data: error.message,
    });
  }
};


export const readAll =async(req: Request, res: Response)=>{
    try {
        const user =await userModel.find()

        return res.status(200).json({
            message:"can see all users",
            data:user
        })
    } catch (error) {
        return res.status(404).json({
            message:"error reading all users",
            data:error.message
        })
    }
}

export const readOneUser =async(req:Request, res:Response)=>{
    try {
        const {id} = req.params
        const user =await userModel.findById(id)
        return res.status(200).json({
            message:"can see one of your users",
            data: user
        })
    } catch (error) {
        return res.status(404).json({
            message:"User not found",
            data:error.message
        })
    }
}