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
exports.verifyUser = void 0;
const error_utils_1 = require("./error.utils");
const user_model_1 = __importDefault(require("../models/user.model"));
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return next((0, error_utils_1.errorHandler)(401, "User not registered or token malfunctions"));
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return next((0, error_utils_1.errorHandler)(401, "Permission didn't match"));
        }
        res.status(200).json({
            message: "Authenticated",
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.verifyUser = verifyUser;
