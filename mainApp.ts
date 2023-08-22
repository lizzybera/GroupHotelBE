import cors from "cors"
import express, { Application, NextFunction, Request, Response } from "express"
import { HTTP, mainError } from "./error/mainError"
import { errorHandler } from "./error/errorHandling"

export const mainApp = (app : Application)=>{
    app.use(express.json())
    app.use(cors())

    app.get("/", (req : Request, res : Response) =>{
        try {
            res.status(200).json({
                message : "Welcome"
            })
        } catch (error) {
            res.status(404).json({
                message : "Error"
            })
        }
    })

    app.all("*", (req : Request, res : Response, next : NextFunction) =>{
        next(
            new mainError({
                message : "this error occured due to incorrect Router",
                success : false,
                status : HTTP.BAD_REQUEST,
                name : "Router Error" 
            })
        )
    })

    app.use(errorHandler)
    
}