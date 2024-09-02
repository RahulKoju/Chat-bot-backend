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
exports.handleDeleteUserChats = exports.handleGetAllChatsOfUser = exports.generateChatCompletion = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const error_utils_1 = require("../utils/error.utils");
const generateChatCompletion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        const user = yield user_model_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return next((0, error_utils_1.errorHandler)(401, "User not found"));
        }
        const apikey = process.env.GROQ_API_KEY;
        const url = "https://api.groq.com/openai/v1/chat/completions";
        const data = {
            messages: [
                {
                    role: "user",
                    content: message,
                },
            ],
            model: "llama3-8b-8192",
        };
        // await fetch(url, {
        //   method: "POST",
        //   headers: {
        //     Authorization: `Bearer ${apikey}`,
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(data),
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     //console.log("Success:", data);
        //     console.log("meesages", data.choices[0].message.content);
        //   })
        //   .catch((error) => {
        //     console.error("Error:", error);
        //   });
        // Fetch the AI response
        const aiResponse = yield fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apikey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const aiData = yield aiResponse.json();
        const aiMessage = aiData.choices[0].message.content;
        // Create new chat entries
        const newChats = [
            { role: "user", content: message },
            { role: "assistant", content: aiMessage },
        ];
        // Add new chats to the user's chat history
        user.chats.push(...newChats);
        yield user.save();
        // Respond with the AI message
        return res.status(200).json({ message: aiMessage });
    }
    catch (error) {
        return next(error);
    }
});
exports.generateChatCompletion = generateChatCompletion;
const handleGetAllChatsOfUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return next((0, error_utils_1.errorHandler)(401, "user not registererd or token malfunction"));
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return next((0, error_utils_1.errorHandler)(401, "Permission didn't match"));
        }
        res.status(200).json({ message: "OK", chats: user.chats });
    }
    catch (error) {
        next(error);
    }
});
exports.handleGetAllChatsOfUser = handleGetAllChatsOfUser;
const handleDeleteUserChats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findById(res.locals.jwtData.id);
        if (!user) {
            return next((0, error_utils_1.errorHandler)(401, "user not registererd or token malfunction"));
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return next((0, error_utils_1.errorHandler)(401, "Permission didn't match"));
        }
        //@ts-ignore
        user.chats = [];
        yield user.save();
        res.status(200).json({ message: "OK" });
    }
    catch (error) {
        next(error);
    }
});
exports.handleDeleteUserChats = handleDeleteUserChats;
