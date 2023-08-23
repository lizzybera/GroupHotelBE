import express from "express";
import { createRoom, viewOneRoom, viewRooms } from "../controller/roomController";


const router = express.Router()
router.route("createRoom").post(createRoom)
router.route("viewRooms").get(viewRooms);
router.route("/:roomID/view").get(viewOneRoom);

export default router;