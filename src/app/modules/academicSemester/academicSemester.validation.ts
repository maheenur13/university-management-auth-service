import { z } from 'zod';
import {
  Months,
  academicSemesterCode,
  academicSemesterTitle,
} from './academicSemester.constant';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitle] as [string, ...string[]], {
      required_error: 'Title is required!',
    }),
    year: z.number({ required_error: 'Year is required!' }),
    code: z.enum([...academicSemesterCode] as [string, ...string[]]),
    startMonth: z.enum([...Months] as [string, ...string[]], {
      required_error: 'Start month is required',
    }),
    endMonth: z.enum([...Months] as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};

//   await createZODSchema.parseAsync(req);
