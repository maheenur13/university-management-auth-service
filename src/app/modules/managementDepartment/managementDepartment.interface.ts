import { Model } from 'mongoose';

export type IManagementDepartment = {
  title: string;
};

export type IManagementDepartmentModel = Model<
  IManagementDepartment,
  Record<string, unknown>
>;

export type IManagementDepartmentFilters = {
  searchTerm?: string;
};
