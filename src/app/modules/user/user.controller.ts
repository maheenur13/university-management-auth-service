import { RequestHandler } from 'express';
import userService from './user.service';

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await userService.createUserToDB(user);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'User created !',
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser,
};
