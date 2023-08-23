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
exports.viewOneAdmin = exports.viewAdmins = exports.signInAdmin = exports.createAdmin = void 0;
const mainError_1 = require("../error/mainError");
const adminModel_1 = __importDefault(require("../model/adminModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { companyName, companyEmail, companyAddress, companyPhoneNo, passWord, } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(passWord, salt);
        const { secure_url, public_id } = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const admin = yield adminModel_1.default.create({
            companyName,
            companyEmail,
            companyAddress,
            companyPhoneNo,
            passWord: hash,
            companyPics: secure_url,
            companyPicsID: public_id,
        });
        res.status(mainError_1.HTTP.OK).json({
            message: "Admin Created",
            data: admin,
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error creating Admin",
            data: error.message
        });
    }
});
exports.createAdmin = createAdmin;
const signInAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyEmail, passWord } = req.body;
        const admin = yield adminModel_1.default.findOne({ companyEmail });
        if (admin) {
            const passed = yield bcrypt_1.default.compare(passWord, admin === null || admin === void 0 ? void 0 : admin.passWord);
            if (passed) {
                res.status(mainError_1.HTTP.CREATE).json({
                    message: `Welcome ${admin.companyName}`,
                    data: admin === null || admin === void 0 ? void 0 : admin._id,
                });
            }
            else {
                res.status(mainError_1.HTTP.BAD_REQUEST).json({
                    message: "incorrect password",
                });
            }
        }
        else {
            res.status(mainError_1.HTTP.BAD_REQUEST).json({
                message: "Admin not Found",
            });
        }
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error finding Admin",
            data: error.message
        });
    }
});
exports.signInAdmin = signInAdmin;
const viewAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield adminModel_1.default.find();
        res.status(mainError_1.HTTP.OK).json({
            message: "All Admins",
            data: admin,
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error viewing Admins",
        });
    }
});
exports.viewAdmins = viewAdmins;
const viewOneAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminID } = req.params;
        const admin = yield adminModel_1.default.findById(adminID);
        res.status(mainError_1.HTTP.OK).json({
            message: "viewing Admin",
            data: admin,
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error viewing Admins",
        });
    }
});
exports.viewOneAdmin = viewOneAdmin;
