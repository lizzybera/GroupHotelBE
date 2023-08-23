import express from "express";
import upload from "../config/multer"
import { createAdmin, signInAdmin, viewAdmins, viewOneAdmin } from "../controller/adminController";

const router = express.Router();
router.route("/createAdmin").post(upload, createAdmin)
router.route("/signInAdmin").post(signInAdmin);
router.route("/viewAdmins").get(viewAdmins);
router.route("/:adminID/viewOneAdmin").get(viewOneAdmin);


export default router;