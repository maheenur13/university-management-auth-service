import { Request, Response } from 'express';
import userService from './user.service';

export const createUser = async (req: Request, res: Response) => {
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
    res.status(400).json({
      success: false,
    });
  }
};

export default {
  createUser,
};
