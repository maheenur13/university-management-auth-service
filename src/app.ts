/* eslint-disable no-unused-vars */
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import routes from './app/Routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/api/v1', routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // throw new ApiError(400, 'An error occurred!');
  throw new Error('Testing Error logger');
});

//global error handler
app.use(globalErrorHandler);

export default app;
