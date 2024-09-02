"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatCompletionSchema = exports.resetPasswordSchema = exports.signUpSchema = exports.signInSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Sign In Schema
exports.signInSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "string.email": "Please enter a valid email address.",
        "any.required": "Email is required.",
    }),
    password: joi_1.default.string()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$")) // Updated pattern
        .required()
        .messages({
        "string.pattern.base": "Password must be 8-30 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.",
        "any.required": "Password is required.",
    }),
});
// Sign Up Schema
exports.signUpSchema = joi_1.default.object({
    name: joi_1.default.string().min(3).max(30).required().messages({
        "string.min": "Full name must be at least 3 characters long.",
        "string.max": "Full name cannot be longer than 30 characters.",
        "any.required": "Full name is required.",
    }),
    email: joi_1.default.string().email().required().messages({
        "string.email": "Please enter a valid email address.",
        "any.required": "Email is required.",
    }),
    password: joi_1.default.string()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,30}$"))
        .required()
        .messages({
        "string.pattern.base": "Password must be 8-30 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.",
        "any.required": "Password is required.",
    }),
});
exports.resetPasswordSchema = joi_1.default.object({
    password: joi_1.default.string()
        .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"))
        .required()
        .messages({
        "string.pattern.base": `Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.`,
        "string.empty": `Password cannot be empty`,
        "any.required": `Password is required`,
    }),
    confirmPassword: joi_1.default.string().valid(joi_1.default.ref("password")).required().messages({
        "any.only": `Passwords do not match`,
        "string.empty": `Confirm Password cannot be empty`,
        "any.required": `Confirm Password is required`,
    }),
});
exports.chatCompletionSchema = joi_1.default.object({
    message: joi_1.default.string().required().messages({
        "string.empty": "Message is required",
    }),
});
