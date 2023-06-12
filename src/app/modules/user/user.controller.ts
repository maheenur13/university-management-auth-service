import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import userService from './user.service';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await userService.createUserToDB(user);
    if (result) {
      sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'User created successfully',
      });
      next();
    }
  }
);

export const UserController = {
  createUser,
};
