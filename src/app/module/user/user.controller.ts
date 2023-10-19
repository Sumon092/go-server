/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.services';

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
  } catch (error: any) {
    throw new Error(error.massage);
  }
});

const getUsers = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await UserService.getUsers();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user fetched successfully',
      data: result,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
});
const addBooking = catchAsync(async (req: Request, res: Response) => {
  try {
    const id = req?.user?.userId;
    const data = req.body;
    const result = await UserService.addBooking(id, data);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking added successfully',
      data: result,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
});
const getBookings = catchAsync(async (req: Request, res: Response) => {
  try {
    const result = await UserService.getBookings();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking fetched successfully',
      data: result,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
});
const getBookingById = catchAsync(async (req: Request, res: Response) => {
  try {
    const id = req?.user?.userId;
    const result = await UserService.getBookingsByUserId(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'users Booking fetched successfully',
      data: result,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
});
const confirmBooking = catchAsync(async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string | undefined;

    if (id === undefined) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Booking ID is required',
      });
    }
    const result = await UserService.confirmBooking(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking confirmed',
      data: result,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
});
const cancelBooking = catchAsync(async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string | undefined;

    if (id === undefined) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Booking ID is required',
      });
    }
    const result = await UserService.cancelBooking(id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Booking cancelled',
      data: result,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const UserController = {
  makeAdmin,
  getUsers,
  addBooking,
  getBookings,
  getBookingById,
  confirmBooking,
  cancelBooking,
};
