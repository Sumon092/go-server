import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.services';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  const resultWithoutPassword = {
    id: result.id,
    name: result.name,
    email: result.email,
    role: result.role,
    address: result.address,
    contact_no: result.contact_no,
  };

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: resultWithoutPassword,
  });
});

const SignIn = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const result = await AuthService.SignIn(email, password);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Logged in successful',
      data: result,
    });
  
    return result;
  });
  

export const AuthController = {
  register,
  SignIn
};
