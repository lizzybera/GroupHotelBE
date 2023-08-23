import express from "express";
import { createBook } from "../controller/bookController";



const router = express.Router();
router.route("/:userId/:roomId/book-room").post(createBook)


export default router;