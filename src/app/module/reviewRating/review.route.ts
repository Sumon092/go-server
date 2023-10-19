import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { ReviewController } from './review.controller';

const router = express.Router();

router.post(
  '/:serviceId',
  auth(ENUM_USER_ROLE.USER),
  ReviewController.addReviewRating
);
router.get('/', ReviewController.getReviewsByUser);

export const ReviewsRouter = router;
