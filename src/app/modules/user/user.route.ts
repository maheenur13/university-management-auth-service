import express from 'express';
import validateRequest from '../../middlewares/validaterequest';
import { UserController } from './user.controller';
import { UserValidations } from './user.validation';

const router = express.Router();
router.post(
  '/create-user',
  validateRequest(UserValidations.createZODSchema),
  UserController.createUser
);

export const UserRoutes = router;
