import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/pagination.helpers';
import { IGenericResponse } from '../../../interfaces/common';
import { AcademicFacultyModel } from '../academicFaculty/academicFaculty.model';
import { IPaginationOptions } from '../academicSemester/academicSemester.interface';
import { academicDepartmentSearchableFields } from './academicDepartment.constants';
import {
  IAcademicDepartment,
  IAcademicDepartmentEvent,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { AcademicDepartmentModel } from './academicDepartment.model';

const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartmentModel.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};
const createDepartmentEvent = async (
  payload: IAcademicDepartmentEvent
): Promise<void> => {
  const faculty = await AcademicFacultyModel.findOne({
    syncId: payload.academicFacultyId,
  });

  await AcademicDepartmentModel.create({
    academicFaculty: faculty?._id,
    syncId: payload.id,
    title: payload.title,
  });
};

const getAllDepartment = async (
  filters: Partial<IAcademicDepartmentFilters>,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchableFields.map(field => ({
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

  const result = await AcademicDepartmentModel.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicDepartmentModel.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartmentModel.findById(id).populate(
    'academicFaculty'
  );
  return result;
};

const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartmentModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  ).populate('academicFaculty');
  return result;
};
const updateDepartmentEvent = async (
  payload: Partial<IAcademicDepartmentEvent>
): Promise<void> => {
  await AcademicDepartmentModel.findOneAndUpdate(
    { syncId: payload.id },
    {
      $set: {
        title: payload.title,
      },
    }
  );
};

const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartmentModel.findByIdAndDelete(id);
  return result;
};
const deleteDepartmentEvent = async (id: string): Promise<void> => {
  await AcademicDepartmentModel.findOneAndDelete({
    syncId: id,
  });
};

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
  createDepartmentEvent,
  updateDepartmentEvent,
  deleteDepartmentEvent,
};
