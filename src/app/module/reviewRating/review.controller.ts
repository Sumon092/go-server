import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ReviewService } from './review.service';

const addReviewRating = catchAsync(async (req: Request, res: Response) => {
  try {
    const id = req?.user?.userId;
    const { serviceId } = req.params;
    const data = req.body;
    const result = await ReviewService.addReviewRating(serviceId, id, data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review added successfully',
      data: result,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
});
const getReviewsByUser = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await ReviewService.getReviewsByUser();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review added successfully',
      data: result,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const ReviewController={
    addReviewRating,
    getReviewsByUser
}
