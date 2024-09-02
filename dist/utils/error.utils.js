"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// Create the errorHandler function with proper types
const errorHandler = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};
exports.errorHandler = errorHandler;
