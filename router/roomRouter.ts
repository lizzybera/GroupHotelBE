import express from "express";
import { createRoom, viewAdminRooms, viewOneRoom, viewRooms } from "../controller/roomController";
import upload from "../config/multer";


const router = express.Router()
router.route("/:adminID/createRoom").post(upload,createRoom)
router.route("/viewRooms").get(viewRooms);
router.route("/:adminID/viewAdminRooms").get(viewAdminRooms);
router.route("/:roomID/view").get(viewOneRoom);

export default router;