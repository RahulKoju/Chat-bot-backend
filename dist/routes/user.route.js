"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_controller_1 = require("../controllers/auth.controller");
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const validation_util_1 = require("../utils/validation.util");
const verifyUser_util_1 = require("../utils/verifyUser.util");
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
const router = (0, express_1.Router)();
router.get("/getallusers", user_controller_1.handleGetAllUsers);
router.post("/signup", (0, validation_middleware_1.default)(validation_util_1.signUpSchema), auth_controller_1.handleSignUp);
router.post("/signin", (0, validation_middleware_1.default)(validation_util_1.signInSchema), auth_controller_1.handleSignIn);
router.get("/check-status", verifyToken_middleware_1.verifyToken, verifyUser_util_1.verifyUser);
router.get("/logout", verifyToken_middleware_1.verifyToken, auth_controller_1.handleLogout);
exports.default = router;
