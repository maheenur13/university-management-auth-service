import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...data } = req.body;
    const result = await AcademicSemesterService.createSemester(data);
    if (result) {
      sendResponse(res, {
        data: result,
        statusCode: httpStatus.OK,
        success: true,
        message: 'Semester created successfully!',
      });
      next();
    }
  }
);

export const AcademicSemesterController = {
  createSemester,
};
