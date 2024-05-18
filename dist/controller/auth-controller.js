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
exports.loginController = exports.registerController = void 0;
const auth_token_1 = require("../services/auth-token");
const password_encryptor_1 = require("../services/password-encryptor");
const client_1 = require("@prisma/client");
const user_1 = __importDefault(require("../models/user"));
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        user.password = (0, password_encryptor_1.passwordEncryptor)(user.password);
        const newUser = yield user_1.default.create({
            data: Object.assign({}, user),
        });
        const token = (0, auth_token_1.generateToken)(newUser);
        res.header('auth-token', token);
        res.status(200).json({ token });
    }
    catch (error) {
        if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if ((error === null || error === void 0 ? void 0 : error.code) === 'P2002') {
                res.status(400).json({
                    message: 'The email used already exists',
                });
                return;
            }
        }
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.registerController = registerController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const userFound = yield user_1.default.findUnique({
            where: {
                email: user.email,
            },
        });
        if (!userFound) {
            res.status(400).json({ message: 'User not found' });
            return;
        }
        const passwordMatch = yield (0, password_encryptor_1.passwordCompare)(user.password, userFound.password);
        if (!passwordMatch) {
            res.status(401).json({ message: 'Invalid Credentials' });
            return;
        }
        const token = (0, auth_token_1.generateToken)(userFound);
        res.header('auth-token', token);
        res.status(200).json({ token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
exports.loginController = loginController;
