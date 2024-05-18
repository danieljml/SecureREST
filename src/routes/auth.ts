import express from 'express';
import {
  registerController,
  loginController,
} from '../controller/auth-controller';
import { schemaValidator } from '../middleware/schema-validator';
import { Register, Login } from '../schemas/user';

const authRouter = express.Router();

authRouter.post('/register', schemaValidator(Register), registerController);

authRouter.post('/login', schemaValidator(Login), loginController);

export default authRouter;
