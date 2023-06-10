import { z } from 'zod';

const createZODSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required',
    }),
    password: z.string().optional(),
  }),
});

export const UserValidations = {
  createZODSchema,
};

//   await createZODSchema.parseAsync(req);
