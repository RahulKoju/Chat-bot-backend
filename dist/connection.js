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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
exports.disconnectFromDatabase = disconnectFromDatabase;
const mongoose_1 = require("mongoose");
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        const dbUrl = process.env.MONGODB_URL;
        if (!dbUrl) {
            throw new Error("MONGODB_URL is not defined");
        }
        try {
            yield (0, mongoose_1.connect)(dbUrl);
            console.log("Connected to MongoDB");
        }
        catch (error) {
            console.error("Could not connect to MongoDB", error);
            throw new Error("Could not connect to MongoDB");
        }
    });
}
function disconnectFromDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, mongoose_1.disconnect)();
            console.log("Disconnected from MongoDB");
        }
        catch (error) {
            console.error("Could not disconnect from MongoDB", error);
            throw new Error("Could not disconnect from MongoDB");
        }
    });
}
