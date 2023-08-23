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
exports.readOneUser = exports.readAll = exports.updateUser = exports.signInUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const mainError_1 = require("../error/mainError");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { fullName, password, email, phoneNumber, } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const { secure_url, public_id } = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        // this is a comment
        const user = yield userModel_1.default.create({
            fullName,
            password: hash,
            email,
            phoneNumber,
            avatar: secure_url,
            avatarUrl: public_id
        });
        return res.status(mainError_1.HTTP.CREATE).json({
            message: "user created successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "error creating user",
        });
    }
});
exports.createUser = createUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        const hash = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
        if (user) {
            if (hash) {
                return res.status(mainError_1.HTTP.CREATE).json({
                    message: `welcome ${user.fullName} great to have you onBoard`,
                    data: user._id,
                });
            }
            else {
                return res.status(mainError_1.HTTP.BAD_REQUEST).json({
                    message: "user credentials are invalid",
                });
            }
        }
        else {
            return res.status(mainError_1.HTTP.BAD_REQUEST).json({
                message: "user not found",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "error signing in user",
        });
    }
});
exports.signInUser = signInUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { phoneNumber, city } = req.body;
        const user = yield userModel_1.default.findByIdAndUpdate(id, { phoneNumber, city }, { new: true });
        return res.status(mainError_1.HTTP.CREATE).json({
            message: "user updated successfully",
            data: user,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "error updating user",
        });
    }
});
exports.updateUser = updateUser;
const readAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.find();
        return res.status(mainError_1.HTTP.OK).json({
            message: "can see all users",
            data: user
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "error reading all users",
        });
    }
});
exports.readAll = readAll;
const readOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield userModel_1.default.findById(id);
        return res.status(mainError_1.HTTP.OK).json({
            message: "can see one of your users",
            data: user
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "User not found",
        });
    }
});
exports.readOneUser = readOneUser;
