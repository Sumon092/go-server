import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { UserSchema } from './auth.validation';

const router = express.Router();

router.post('/register',validateRequest(UserSchema),
 AuthController.register);
router.post('/sign-in', AuthController.SignIn);

export const AuthRouter = router;
