import mongoose, { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/pagination.helpers';
import { RedisClient } from '../../../shared/redis';
import { IPaginationOptions } from '../academicSemester/academicSemester.interface';
import { UserModel } from '../user/user.model';
import {
  EVENT_FACULTY_UPDATED,
  facultySearchableFields,
} from './faculty.constant';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { FacultyModel } from './faculty.model';

const getAllFaculties = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
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

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await FacultyModel.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await FacultyModel.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await FacultyModel.findOne({ id })
    .populate('academicDepartment')
    .populate('academicFaculty');

  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await FacultyModel.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const { name, ...FacultyData } = payload;
  const updatedFacultyData: Partial<IFaculty> = { ...FacultyData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IFaculty>;
      (updatedFacultyData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await FacultyModel.findOneAndUpdate(
    { id },
    updatedFacultyData,
    {
      new: true,
    }
  )
    .populate('academicFaculty')
    .populate('academicDepartment');
  if (result) {
    await RedisClient.publish(EVENT_FACULTY_UPDATED, JSON.stringify(result));
  }

  return result;
};

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  // check if the faculty is exist
  const isExist = await FacultyModel.findOne({ id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found !');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //delete faculty first
    const faculty = await FacultyModel.findOneAndDelete({ id }, { session });
    if (!faculty) {
      throw new ApiError(404, 'Failed to delete student');
    }
    //delete user
    await UserModel.deleteOne({ id });
    session.commitTransaction();
    session.endSession();

    return faculty;
  } catch (error) {
    session.abortTransaction();
    throw error;
  }
};

export const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
