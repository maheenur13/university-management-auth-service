/* eslint-disable no-unused-vars */
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import userRouter from './app/modules/users/user.route';
import ApiError from './errors/ApiError';
const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/api/v1/user', userRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  throw new ApiError(400, 'An error occurred!');
});

//global error handler
app.use(globalErrorHandler);

export default app;
