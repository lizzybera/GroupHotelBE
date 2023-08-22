import cors from "cors"
import express, { Application, Request, Response } from "express"

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
    
}