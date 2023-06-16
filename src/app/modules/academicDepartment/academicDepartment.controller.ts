import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { departmentFilterableFields } from './academicDepartment.constants';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await AcademicDepartmentService.createDepartment(data);
  if (result) {
    sendResponse<IAcademicDepartment>(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty created successfully!',
    });
  }
});

const getAllDepartment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, departmentFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicDepartmentService.getAllDepartment(
    filters,
    paginationOptions
  );

  if (result) {
    sendResponse<IAcademicDepartment[]>(res, {
      data: result.data,
      meta: result.meta,
      statusCode: httpStatus.OK,
      success: true,
      message: 'All faculty retrieve successfully!',
    });
  }
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;
  const result = await AcademicDepartmentService.getSingleDepartment(id);
  if (result) {
    sendResponse<IAcademicDepartment>(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester retrieve successfully!',
    });
  }
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;

  const updatedData = req.body;

  const result = await AcademicDepartmentService.updateDepartment(
    id,
    updatedData
  );
  if (result) {
    sendResponse<IAcademicDepartment>(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester updated successfully!',
    });
  }
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params?.id;

  const result = await AcademicDepartmentService.deleteDepartment(id);
  if (result) {
    sendResponse<IAcademicDepartment>(res, {
      data: result,
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester deleted successfully!',
    });
  }
});

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
