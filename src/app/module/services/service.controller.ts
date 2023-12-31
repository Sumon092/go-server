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
    message: 'Service fetched successfully',
    data: result,
  });
});

const updateService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await ServiceService.updateService(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});
const deleteService = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ServiceService.deleteService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted successfully',
    data: result,
  });
});
const getServicesByCategory = catchAsync(
  async (req: Request, res: Response) => {
    const { category } = req.params;
    console.log({ category });
    const result = await ServiceService.getServicesByCategory(category);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Service category fetched successfully',
      data: result,
    });
  }
);
const getServicesByCity = catchAsync(async (req: Request, res: Response) => {
  const { city } = req.params;

  const result = await ServiceService.getServicesByCity(city);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service by city fetched successfully',
    data: result,
  });
});

export const ServiceController = {
  addService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
  getServicesByCategory,
  getServicesByCity,
};
