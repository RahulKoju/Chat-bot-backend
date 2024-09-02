"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (id, email, expiresIn = "7d") => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    const payload = {
        id,
        email,
    };
    const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn,
    });
    return token;
};
exports.createToken = createToken;
const validateToken = (token) => {
    const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    return payload;
};
exports.validateToken = validateToken;
