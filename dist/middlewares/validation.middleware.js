"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation = (validationSchema) => {
    return (req, res, next) => {
        const { error } = validationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message,
            });
        }
        next();
    };
};
exports.default = validation;
