import {
  IAcademicSemesterCode,
  IAcademicSemesterTitle,
  Month,
} from './academicSemester.interface';

export const Months: Month[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitle: IAcademicSemesterTitle[] = [
  'Autumn',
  'Fall',
  'Summer',
];
export const academicSemesterCode: IAcademicSemesterCode[] = ['01', '02', '03'];

type IAcademicSemesterTitleMapper = {
  [key: string]: string;
};

export const academicSemesterTitleCodeMapper: IAcademicSemesterTitleMapper = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemesterSearchable = ['title', 'code', 'year'];

export const filterableFields = ['searchTerm', 'title', 'code', 'year'];

export const EVENT_ACADEMICSEMESTER_CREATED = 'academic-semester.created';
export const EVENT_ACADEMICSEMESTER_UPDATED = 'academic-semester.updated';
