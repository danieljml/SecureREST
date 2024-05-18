"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth-controller");
const schema_validator_1 = require("../middleware/schema-validator");
const user_1 = require("../schemas/user");
const authRouter = express_1.default.Router();
authRouter.post('/register', (0, schema_validator_1.schemaValidator)(user_1.Register), auth_controller_1.registerController);
authRouter.post('/login', (0, schema_validator_1.schemaValidator)(user_1.Login), auth_controller_1.loginController);
exports.default = authRouter;
