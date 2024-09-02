"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const constants_util_1 = require("../utils/constants.util");
const error_utils_1 = require("../utils/error.utils");
const authentication_util_1 = require("../utils/authentication.util");
const verifyToken = (req, res, next) => {
    const token = req.signedCookies[`${constants_util_1.COOKIE_NAME}`];
    if (!token) {
        return next((0, error_utils_1.errorHandler)(401, "Unauthorised"));
    }
    const userPayload = (0, authentication_util_1.validateToken)(token);
    if (!userPayload) {
        return next((0, error_utils_1.errorHandler)(401, "Unauthorised"));
    }
    res.locals.jwtData = userPayload;
    next();
};
exports.verifyToken = verifyToken;
