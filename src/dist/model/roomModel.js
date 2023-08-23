"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const roomModel = new mongoose_1.default.Schema({
    roomSize: {
        type: String
    },
    bedSize: {
        type: String,
        unique: true
    },
    Guest: {
        type: String
    },
    roomType: {
        type: String,
    },
    description: {
        type: String,
    },
    amount: {
        type: Number
    },
    isAvailable: {
        type: Boolean
    },
    admin: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "admins"
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("rooms", roomModel);
