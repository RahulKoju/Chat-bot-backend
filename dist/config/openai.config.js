"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureOpenAI = void 0;
const openai_1 = __importDefault(require("openai"));
const configureOpenAI = () => {
    const client = new openai_1.default({
        apiKey: process.env.OPEN_AI_SECRET,
        organization: process.env.OPEN_AI_ORGANIZATION_ID,
    });
    return client;
};
exports.configureOpenAI = configureOpenAI;
