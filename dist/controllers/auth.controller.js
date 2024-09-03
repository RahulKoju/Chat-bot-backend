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
exports.handleLogout = exports.handleSignIn = exports.handleSignUp = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const error_utils_1 = require("../utils/error.utils");
const authentication_util_1 = require("../utils/authentication.util");
const constants_util_1 = require("../utils/constants.util");
const isProduction = process.env.NODE_ENV === "production";
// Handle Sign Up
const handleSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Validate request data
        if (!name ||
            !email ||
            !password ||
            name.trim() === "" ||
            email.trim() === "" ||
            password.trim() === "") {
            return next((0, error_utils_1.errorHandler)(400, "All fields are required."));
        }
        // Check if the user already exists
        let user = yield user_model_1.default.findOne({ email });
        if (user) {
            return next((0, error_utils_1.errorHandler)(409, "User with given email already exists!"));
        }
        // Hash the password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        // Create and save the new user
        user = new user_model_1.default({ name, email, password: hashedPassword });
        yield user.save();
        res.status(200).json({
            message: "Sign Up successful",
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.handleSignUp = handleSignUp;
// Handle Sign In
const handleSignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            return next((0, error_utils_1.errorHandler)(401, "User not found"));
        }
        // Compare passwords
        const validPassword = yield bcryptjs_1.default.compare(password, user.password);
        if (!validPassword) {
            return next((0, error_utils_1.errorHandler)(403, "Incorrect password"));
        }
        // Common cookie options
        const cookieOptions = {
            path: "/",
            httpOnly: true,
            signed: true,
            sameSite: isProduction ? "none" : "lax",
            secure: isProduction,
        };
        // Clear existing cookie
        res.clearCookie(constants_util_1.COOKIE_NAME, cookieOptions);
        const token = (0, authentication_util_1.createToken)(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        // Set new cookie
        res.cookie(constants_util_1.COOKIE_NAME, token, Object.assign(Object.assign({}, cookieOptions), { expires }));
        res.status(200).json({
            message: "Sign In successful",
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.handleSignIn = handleSignIn;
const handleLogout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return next((0, error_utils_1.errorHandler)(401, "User not registered or token malfunctions"));
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return next((0, error_utils_1.errorHandler)(401, "Permission didn't match"));
        }
        res.clearCookie(constants_util_1.COOKIE_NAME, {
            path: "/",
            httpOnly: true,
            signed: true,
        });
        res.status(200).json({
            message: "Logged Out",
        });
    }
    catch (error) {
        next(error);
    }
});
exports.handleLogout = handleLogout;
