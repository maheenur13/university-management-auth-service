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
    year: z.string({ required_error: 'Year is required!' }),
    code: z.enum([...academicSemesterCode] as [string, ...string[]]),
    startMonth: z.enum([...Months] as [string, ...string[]], {
      required_error: 'Start month is required',
    }),
    endMonth: z.enum([...Months] as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
});

const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemesterTitle] as [string, ...string[]], {
          required_error: 'Title is required!',
        })
        .optional(),
      year: z.string({ required_error: 'Year is required!' }).optional(),
      code: z
        .enum([...academicSemesterCode] as [string, ...string[]])
        .optional(),
      startMonth: z
        .enum([...Months] as [string, ...string[]], {
          required_error: 'Start month is required',
        })
        .optional(),
      endMonth: z
        .enum([...Months] as [string, ...string[]], {
          required_error: 'End month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message:
        'Either Both Title and Code must be provided or neither Title nor Code',
    }
  );

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
  updateAcademicSemesterZodSchema,
};

//   await createZODSchema.parseAsync(req);
