"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
const validation_util_1 = require("../utils/validation.util");
const chat_controller_1 = require("../controllers/chat.controller");
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const router = (0, express_1.Router)();
router.post("/new", verifyToken_middleware_1.verifyToken, (0, validation_middleware_1.default)(validation_util_1.chatCompletionSchema), chat_controller_1.generateChatCompletion);
router.get("/all-chats", verifyToken_middleware_1.verifyToken, chat_controller_1.handleGetAllChatsOfUser);
router.delete("/delete", verifyToken_middleware_1.verifyToken, chat_controller_1.handleDeleteUserChats);
exports.default = router;
