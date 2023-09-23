import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/pagination.helpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../academicSemester/academicSemester.interface';
import { academicFacultySearchableFields } from './academicFaculty.contants';
import {
  IAcademicFaculty,
  IAcademicFacultyEvent,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import { AcademicFacultyModel } from './academicFaculty.model';

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFacultyModel.create(payload);
  return result;
};
const createFacultyEvent = async (
  payload: IAcademicFacultyEvent
): Promise<void> => {
  await AcademicFacultyModel.create({
    title: payload.title,
    syncId: payload.id,
  });
};
const updateFacultyEvent = async (
  payload: IAcademicFacultyEvent
): Promise<void> => {
  await AcademicFacultyModel.updateOne(
    {
      syncId: payload.id,
    },
    {
      $set: {
        title: payload.title,
      },
    }
  );
};

const deleteFacultyEvents = async (id: string): Promise<void> => {
  const isExist = await AcademicFacultyModel.findOne({
    syncId: id,
  });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty could not found!');
  }
  await AcademicFacultyModel.findOneAndDelete({
    syncId: id,
  });
};

const getAllFaculty = async (
  filters: Partial<IAcademicFacultyFilters>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicFacultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicFacultyModel.find(whereConditions)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicFacultyModel.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const isExist = await AcademicFacultyModel.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty could not found!');
  }
  const result = await AcademicFacultyModel.findById(id);
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const isExist = await AcademicFacultyModel.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty could not found!');
  }

  const result = await AcademicFacultyModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const isExist = await AcademicFacultyModel.findById(id);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty could not found!');
  }
  const result = await AcademicFacultyModel.findByIdAndDelete(id);
  return result;
};

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
  createFacultyEvent,
  updateFacultyEvent,
  deleteFacultyEvents,
};
