import { Model } from 'mongoose';

export type IAcademicFaculty = {
  title: string;
  syncId: string;
};
export type IAcademicFacultyEvent = {
  title: string;
  id: string;
};

export type IAcademicFacultyModel = Model<IAcademicFaculty>;

export type IAcademicFacultyFilters = {
  searchTerm?: string;
};
