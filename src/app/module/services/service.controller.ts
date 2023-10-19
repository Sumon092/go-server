import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ServiceService } from './service.services';

const addService = catchAsync(async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const result = await ServiceService.addService(data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service created successful',
      data: result,
    });

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
});
const getServices = catchAsync(async (req: Request, res: Response) => {
  try {
    
    const result = await ServiceService.getServices();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service fetched successful',
      data: result,
    });

    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
});

export const ServiceController = {
  addService,
  getServices
};
