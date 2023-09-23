import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import {
  IAcademicFaculty,
  IAcademicFacultyModel,
} from './academicFaculty.interface';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
    },
    syncId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true,
  }
);

academicFacultySchema.pre('save', async function (next) {
  const isExist = await AcademicFacultyModel.findOne({
    title: this.title,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'This academic faculty is already exist!'
    );
  }
  next();
});

export const AcademicFacultyModel = model<
  IAcademicFaculty,
  IAcademicFacultyModel
>('AcademicFaculty', academicFacultySchema);
