/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.services';
import httpStatus from 'http-status';

const makeAdmin = catchAsync(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await UserService.makeAdmin(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated as a admin',
      data: result,
    });
  } catch (error:any) {
    throw new Error(error.massage)
  }
});

export const UserController = {
  makeAdmin,
};
