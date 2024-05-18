"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("../controller/users-controller");
const token_validator_1 = require("../middleware/token-validator");
const router = express_1.default.Router();
router.get('/user', token_validator_1.tokenValidator, users_controller_1.getUsersController);
router.get('/user/:id', token_validator_1.tokenValidator, users_controller_1.getUsersByIdController);
router.put('/user/:id', token_validator_1.tokenValidator, users_controller_1.updateUserController);
router.delete('/user/:id', token_validator_1.tokenValidator, users_controller_1.deleteUserController);
exports.default = router;
