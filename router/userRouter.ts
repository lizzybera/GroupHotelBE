import express from "express";
import { createUser, readAll, readOneUser, signInUser, updateUser } from "../controller/userController";
import upload from "../config/multer"


const router = express.Router();
router.route("/createUser").post(upload, createUser);
router.route("/signInUser").post(signInUser)
router.route("/:id/updateUser").post(updateUser)
router.route("/readAll").get(readAll)
router.route("/:id/readOneUser").get(readOneUser)

export default router