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
exports.createBook = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mainError_1 = require("../error/mainError");
const bookModel_1 = __importDefault(require("../model/bookModel"));
const roomModel_1 = __importDefault(require("../model/roomModel"));
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userId, roomId } = req.params;
        const { time } = req.body;
        const booked = yield bookModel_1.default.create({
            time,
            userId,
        });
        const room = yield roomModel_1.default.findById(roomId);
        (_a = room === null || room === void 0 ? void 0 : room.book) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(booked._id));
        room === null || room === void 0 ? void 0 : room.save();
        res.status(mainError_1.HTTP.OK).json({
            message: "booked successfully",
            data: booked,
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error booking room",
            data: error.message,
        });
    }
});
exports.createBook = createBook;
