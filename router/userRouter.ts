import express from "express";
import { createUser, readAll, readOneUser, signInUser, updateUser } from "../controller/userController";


const router = express.Router();
router.route("/createUser").post(createUser);
router.route("/signInUser").post(signInUser)
router.route("/ updateUser").post(updateUser)
router.route("/readAll").post(readAll)
router.route("/readOneUser").post(readOneUser)