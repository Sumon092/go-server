import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewZodSchema } from './review.validation';

const router = express.Router();

router.post(
  '/:serviceId',
  validateRequest(ReviewZodSchema.create),
  auth(ENUM_USER_ROLE.USER),
  ReviewController.addReviewRating
);
router.get('/', ReviewController.getReviewsByUser);

export const ReviewsRouter = router;
