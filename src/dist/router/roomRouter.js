"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomController_1 = require("../controller/roomController");
const multer_1 = __importDefault(require("../config/multer"));
const router = express_1.default.Router();
router.route("/:adminID/createRoom").post(multer_1.default, roomController_1.createRoom);
router.route("/viewRooms").get(roomController_1.viewRooms);
router.route("/:roomID/view").get(roomController_1.viewOneRoom);
exports.default = router;
