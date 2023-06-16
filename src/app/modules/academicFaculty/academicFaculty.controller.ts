import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { facultyFilterableFields } from './academicFaculty.contants';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await AcademicFacultyService.createFaculty(data);
  if (result) {
    sendResponse<IAcademicFaculty>(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty created successfully!',
    });
  }
});

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicFacultyService.getAllFaculty(
    filters,
    paginationOptions
  );

  if (result) {
    sendResponse<IAcademicFaculty[]>(res, {
      data: result.data,
      meta: result.meta,
      statusCode: httpStatus.OK,
      success: true,
      message: 'All faculty retrieve successfully!',
    });
  }
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;
  const result = await AcademicFacultyService.getSingleFaculty(id);
  if (result) {
    sendResponse<IAcademicFaculty>(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieve successfully!',
    });
  }
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;

  const updatedData = req.body;

  const result = await AcademicFacultyService.updateFaculty(id, updatedData);
  if (result) {
    sendResponse<IAcademicFaculty>(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester updated successfully!',
    });
  }
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;

  const result = await AcademicFacultyService.deleteFaculty(id);
  if (result) {
    sendResponse<IAcademicFaculty>(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester deleted successfully!',
    });
  }
});

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
