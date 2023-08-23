"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const adminModel = new mongoose_1.default.Schema({
    companyName: {
        type: String
    },
    companyEmail: {
        type: String,
        unique: true
    },
    companyAddress: {
        type: String
    },
    passWord: {
        type: String,
        trim: true
    },
    companyPhoneNo: {
        type: Number,
    },
    companyPics: {
        type: String
    },
    companyPicsID: {
        type: String
    },
    room: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "rooms"
        }
    ]
}, { timestamps: true });
exports.default = mongoose_1.default.model("admins", adminModel);
