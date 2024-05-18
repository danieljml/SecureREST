import express from 'express';
import {
  getUsersController,
  getUsersByIdController,
  updateUserController,
  deleteUserController,
} from '../controller/users-controller';
import { tokenValidator } from '../middleware/token-validator';

const router = express.Router();

router.get('/user', tokenValidator, getUsersController);
router.get('/user/:id', tokenValidator, getUsersByIdController);
router.put('/user/:id', tokenValidator, updateUserController);
router.delete('/user/:id', tokenValidator, deleteUserController);

export default router;
