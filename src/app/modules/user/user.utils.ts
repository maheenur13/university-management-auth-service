import { UserModel } from './user.model';

export const findLastUserId = async (): Promise<string | undefined> => {
  const lastUser = await UserModel.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastUser?.id;
};

export const generateUserID = async (): Promise<string> => {
  let currentId = await findLastUserId();
  if (currentId) {
    currentId = String(parseInt(currentId) + 1);
  } else {
    currentId = '1';
  }
  // const newId = await

  return String(currentId).padStart(5, '0');
};
