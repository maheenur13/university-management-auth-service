import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/pagination.helpers';
import { IGenericResponse } from '../../../interfaces/common';
import {
  academicSemesterSearchable,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import {
  IAcaDemicSemesterFilter,
  IAcademicSemester,
  IAcademicSemesterCreatedEvent,
  IPaginationOptions,
} from './academicSemester.interface';
import { AcademicSemesterModel } from './academicSemester.model';

const createSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
  }
  const result = await AcademicSemesterModel.create(payload);
  return result;
};

const getAllSemester = async (
  filters: Partial<IAcaDemicSemesterFilter>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchable.map(field => ({
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

  const result = await AcademicSemesterModel.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemesterModel.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemesterModel.findById(id);
  return result;
};

const updateAcademicSemesterEvent = async (
  e: IAcademicSemesterCreatedEvent
): Promise<void> => {
  await AcademicSemesterModel.findOneAndUpdate(
    {
      syncId: e.id,
    },
    {
      $set: {
        title: e.title,
        year: e.year,
        code: e.code,
        startMonth: e.startMonth,
        endMonth: e.endMonth,
      },
    }
  );
};

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
  }

  const result = await AcademicSemesterModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};
const deleteSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemesterModel.findByIdAndDelete(id);
  return result;
};
const deleteAcademicSemesterEvent = async (id: string): Promise<void> => {
  await AcademicSemesterModel.findOneAndDelete({ syncId: id });
};

const createSemesterFromRedisEvent = async (
  e: IAcademicSemesterCreatedEvent
): Promise<void> => {
  await AcademicSemesterModel.create({
    title: e.title,
    year: e.year,
    code: e.code,
    startMonth: e.startMonth,
    endMonth: e.endMonth,
    syncId: e.id,
  });
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
  updateAcademicSemesterEvent,
  createSemesterFromRedisEvent,
  deleteAcademicSemesterEvent,
};
