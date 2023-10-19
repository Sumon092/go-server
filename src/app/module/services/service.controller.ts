import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { serviceFilterableFields } from './service.constants';
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
  console.log(req.query, 'query');
  const filters = pick(req.query, serviceFilterableFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await ServiceService.getServices(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All services fetched successfully',
    data: result,
  });
});

const getServiceById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceService.getServiceById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched successfully',
    data: result,
  });
});

export const ServiceController = {
  addService,
  getServices,
  getServiceById
};
