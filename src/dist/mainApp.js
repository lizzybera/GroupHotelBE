"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainApp = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const mainError_1 = require("./error/mainError");
const errorHandling_1 = require("./error/errorHandling");
const userRouter_1 = __importDefault(require("./router/userRouter"));
const adminRouter_1 = __importDefault(require("./router/adminRouter"));
const roomRouter_1 = __importDefault(require("./router/roomRouter"));
const bookRouter_1 = __importDefault(require("./router/bookRouter"));
const mainApp = (app) => {
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.get("/", (req, res) => {
        try {
            res.status(200).json({
                message: "Welcome"
            });
        }
        catch (error) {
            res.status(404).json({
                message: "Error"
            });
        }
    });
    app.use("/api/v1", userRouter_1.default);
    app.use("/api/v1", adminRouter_1.default);
    app.use("/api/v1", roomRouter_1.default);
    app.use("/api/v1", bookRouter_1.default);
    app.all("*", (req, res, next) => {
        next(new mainError_1.mainError({
            message: "this error occured due to incorrect Router",
            success: false,
            status: mainError_1.HTTP.BAD_REQUEST,
            name: "Router Error"
        }));
    });
    app.use(errorHandling_1.errorHandler);
};
exports.mainApp = mainApp;
