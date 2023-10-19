import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { BookingCreateSchema } from './user.validation';

const router = express.Router();

router.get('/', UserController.getUsers);
router.patch('/make-admin/:id', UserController.makeAdmin);
router.post(
  '/add-booking',
  validateRequest(BookingCreateSchema),
  auth(ENUM_USER_ROLE.USER),
  UserController.addBooking
);
router.get('/bookings', UserController.getBookings);
router.get(
  '/bookings/user',
  auth(ENUM_USER_ROLE.USER),
  UserController.getBookingById
);
router.patch(
  '/confirm/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  UserController.confirmBooking
);
router.patch(
  '/cancel/:id',
  auth(ENUM_USER_ROLE.USER),
  UserController.cancelBooking
);

export const UserRouter = router;
