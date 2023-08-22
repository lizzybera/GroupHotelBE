import { NextFunction, Request, Response } from "express";
import { HTTP, mainError } from "./mainError";

const preparedErr = (err : mainError, res : Response)=>{
    res.status(HTTP.BAD_REQUEST).json({
        name : err.name,
        message : err.message,
        stack : err.stack,
        status : err.status,
        success : err.success
    })
}

export const errorHandler = (
    err : mainError,
    req : Request,
    res : Response,
    next : NextFunction
)=>{
    preparedErr(err, res)
}