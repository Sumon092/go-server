import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();

router.get('/', UserController.getUsers);
router.patch('/make-admin/:id', UserController.makeAdmin);
router.post(
  '/add-booking',
  auth(ENUM_USER_ROLE.USER),
  UserController.addBooking
);
router.get('/bookings', UserController.getBookings);
router.post('/booking/:id', UserController.getBookingById);
router.post('/confirm/:id', UserController.confirmBooking);
router.post('/cancel/:id', UserController.cancelBooking);

export const UserRouter = router;
