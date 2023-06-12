import status from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import {
  Months,
  academicSemesterCode,
  academicSemesterTitle,
} from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterModel,
} from './academicSemester.interface';

const academicSemesterSchema = new Schema<IAcademicSemester>({
  title: {
    type: String,
    required: true,
    enum: academicSemesterTitle,
  },
  year: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    enum: academicSemesterCode,
  },
  endMonth: {
    type: String,
    required: true,
    enum: Months,
  },
  startMonth: {
    type: String,
    required: true,
    enum: Months,
  },
});
// check same year && same semester issue

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemesterModel.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      status.CONFLICT,
      'This academic semester is already exist!'
    );
  }
  next();
});
export const AcademicSemesterModel = model<
  IAcademicSemester,
  IAcademicSemesterModel
>('AcademicSemester', academicSemesterSchema);
