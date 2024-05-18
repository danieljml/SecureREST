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
exports.deleteUserController = exports.updateUserController = exports.getUsersByIdController = exports.getUsersController = void 0;
const user_1 = __importDefault(require("../models/user"));
const password_encryptor_1 = require("../services/password-encryptor");
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('goood job');
        const users = yield user_1.default.findMany();
        res.status(200).json(users);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUsersController = getUsersController;
const getUsersByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(401).json({ message: 'ID not provided' });
            return;
        }
        const user = yield user_1.default.findUnique({
            where: { id: parseInt(id) },
        });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUsersByIdController = getUsersByIdController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const dataToUpdate = req.body;
        if (!id) {
            res.status(401).json({ message: 'ID not provided' });
            return;
        }
        if (dataToUpdate.password) {
            const passwordHashed = (0, password_encryptor_1.passwordEncryptor)(dataToUpdate.password);
            dataToUpdate.password = passwordHashed;
        }
        const user = yield user_1.default.update({
            where: { id: parseInt(id) },
            data: dataToUpdate,
        });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateUserController = updateUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(401).json({ message: 'ID not provided' });
            return;
        }
        const user = yield user_1.default.delete({
            where: { id: parseInt(id) },
        });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.status(200).json({ message: 'Delete successfully' });
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteUserController = deleteUserController;
