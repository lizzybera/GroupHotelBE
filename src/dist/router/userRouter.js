"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const multer_1 = __importDefault(require("../config/multer"));
const router = express_1.default.Router();
router.route("/createUser").post(multer_1.default, userController_1.createUser);
router.route("/signInUser").post(userController_1.signInUser);
router.route("/:id/updateUser").post(userController_1.updateUser);
router.route("/readAll").get(userController_1.readAll);
router.route("/:id/readOneUser").get(userController_1.readOneUser);
exports.default = router;
