import express, { Application } from "express"
import dotenv from "dotenv"
import { dbConnect } from "./config/db"
import { mainApp } from "./mainApp"
dotenv.config()




const app: Application = express()
mainApp(app)
const port: number = parseInt(process.env.PORT!)

const server = app.listen(process.env.PORT || port, () => {
    dbConnect()
    console.log("server is live")
})

process.on("uncaughtException", (error: any) => {
    console.log('uncaughtException', error)

    process.exit(1)
})

process.on("uncaughtException", (reason:any) => { 
         console.log("uncaughtException",reason)

         server.close(() => {
             process.exit(1);
         });
})