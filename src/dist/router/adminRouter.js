"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../config/multer"));
const adminController_1 = require("../controller/adminController");
const router = express_1.default.Router();
router.route("/createAdmin").post(multer_1.default, adminController_1.createAdmin);
router.route("/signInAdmin").post(adminController_1.signInAdmin);
router.route("/viewAdmins").get(adminController_1.viewAdmins);
router.route("/:adminID/viewOneAdmin").get(adminController_1.viewOneAdmin);
exports.default = router;
