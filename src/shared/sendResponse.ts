import { Response } from 'express';

type IData<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data: T | null;
};
const sendResponse = <T>(res: Response, data: IData<T>): void => {
  const responseData: IData<T> = {
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
    data: data.data || null,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
