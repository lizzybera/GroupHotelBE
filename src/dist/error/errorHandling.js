"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const mainError_1 = require("./mainError");
const preparedErr = (err, res) => {
    res.status(mainError_1.HTTP.BAD_REQUEST).json({
        name: err.name,
        message: err.message,
        stack: err.stack,
        status: err.status,
        success: err.success
    });
};
const errorHandler = (err, req, res, next) => {
    preparedErr(err, res);
};
exports.errorHandler = errorHandler;
