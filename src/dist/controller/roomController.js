"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewOneRoom = exports.updateRoom = exports.viewAdminRooms = exports.viewRooms = exports.createRoom = void 0;
const mainError_1 = require("../error/mainError");
const roomModel_1 = __importDefault(require("../model/roomModel"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const adminModel_1 = __importDefault(require("../model/adminModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { adminID } = req.params;
        const { roomSize, bedSize, Guest, roomType, description, amount } = req.body;
        const admin = yield adminModel_1.default.findById(adminID);
        const { secure_url, public_id } = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const roomed = yield roomModel_1.default.create({
            roomSize,
            bedSize,
            Guest,
            roomType,
            description,
            amount,
            isAvailable: true,
            roomPics: secure_url,
            roomPicsID: public_id,
        });
        (_b = admin === null || admin === void 0 ? void 0 : admin.room) === null || _b === void 0 ? void 0 : _b.push(new mongoose_1.default.Types.ObjectId(roomed._id));
        admin === null || admin === void 0 ? void 0 : admin.save();
        res.status(mainError_1.HTTP.OK).json({
            message: "room Created",
            data: roomed,
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error creating room",
            data: error.message
        });
    }
});
exports.createRoom = createRoom;
const viewRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield roomModel_1.default.find();
        res.status(mainError_1.HTTP.OK).json({
            message: "All rooms",
            data: room,
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error viewing rooms",
        });
    }
});
exports.viewRooms = viewRooms;
const viewAdminRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminID } = req.params;
        const admin = yield adminModel_1.default.findById(adminID).populate({
            path: "room",
            options: {
                sort: {
                    createdAt: -1,
                },
            },
        });
        res.status(201).json({
            message: "admin's Room  ",
            data: admin,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Error Found",
            data: error.message,
        });
    }
});
exports.viewAdminRooms = viewAdminRooms;
const updateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomID } = req.params;
        const room = yield roomModel_1.default.findByIdAndUpdate(roomID, { isAvailable: true }, { new: true });
        res.status(mainError_1.HTTP.OK).json({
            message: "room updated",
            data: room,
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error updating room",
        });
    }
});
exports.updateRoom = updateRoom;
const viewOneRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomID } = req.params;
        const room = yield roomModel_1.default.findById(roomID);
        res.status(mainError_1.HTTP.OK).json({
            message: "viewing one room",
            data: room,
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error viewing one room",
        });
    }
});
exports.viewOneRoom = viewOneRoom;
