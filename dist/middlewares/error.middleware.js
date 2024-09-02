"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.log(err);
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
};
exports.errorMiddleware = errorMiddleware;
