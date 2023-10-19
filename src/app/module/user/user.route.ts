import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.patch('/make-admin/:id', UserController.makeAdmin);

export const UserRouter = router;
