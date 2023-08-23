import express from "express";
import { createRoom, viewOneRoom, viewRooms } from "../controller/roomController";
import upload from "../config/multer";


const router = express.Router()
router.route("/createRoom").post(upload,createRoom)
router.route("/viewRooms").get(viewRooms);
router.route("/:roomID/view").get(viewOneRoom);

export default router;