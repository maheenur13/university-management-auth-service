import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { filterableFields } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const createSemester = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await AcademicSemesterService.createSemester(data);
  if (result) {
    sendResponse<IAcademicSemester>(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester created successfully!',
    });
  }
});

const getAllSemester = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, filterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getAllSemester(
    filters,
    paginationOptions
  );

  if (result) {
    sendResponse<IAcademicSemester[]>(res, {
      data: result.data,
      meta: result.meta,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieve successfully!',
    });
  }
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;
  const result = await AcademicSemesterService.getSingleSemester(id);
  if (result) {
    sendResponse<IAcademicSemester>(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieve successfully!',
    });
  }
});

const updateSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;

  const updatedData = req.body;

  const result = await AcademicSemesterService.updateSemester(id, updatedData);
  if (result) {
    sendResponse<IAcademicSemester>(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester updated successfully!',
    });
  }
});

const deleteSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;

  const result = await AcademicSemesterService.deleteSemester(id);
  if (result) {
    sendResponse<IAcademicSemester>(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester deleted successfully!',
    });
  }
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
