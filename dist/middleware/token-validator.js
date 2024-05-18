"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenValidator = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenValidator = (req, res, next) => {
    try {
        const token = req.header('auth-token');
        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }
        const secret = process.env.JWT_SECRET || 'default-secret';
        jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
            if (err) {
                if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
                    return res.status(401).json({ message: 'Token expired' });
                }
                if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
                    return res.status(403).json({ message: 'Token not valid' });
                }
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            next();
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.tokenValidator = tokenValidator;
