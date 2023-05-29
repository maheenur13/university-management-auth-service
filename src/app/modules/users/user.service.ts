import config from '../../../config';
import { IUser } from './user.interface';
import { UserModel } from './user.model';
import { generateUserID } from './user.utils';

const createUserToDB = async (userData: IUser): Promise<IUser> => {
  const id = await generateUserID();

  // set default id
  userData.id = id;

  if (!userData.password) {
    userData.password = config.default_user_pass as string;
  }

  const createdUser = await UserModel.create(userData);
  if (!createdUser) {
    throw new Error('Failed to create user!');
  }
  return createdUser;
};

export default {
  createUserToDB,
};
