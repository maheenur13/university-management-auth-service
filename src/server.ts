/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errLogger, logger } from './shared/logger';

process.on('uncaughtException', error => {
  errLogger.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.db_url as string);
    logger.info('Database connected!');

    server = app.listen(config.port, () => {
      logger.info(`Server Listening on port ${config.port}`);
    });
  } catch (error) {
    errLogger.error(error);
  }

  process.on('unhandledRejection', error => {
    console.log('yeah unhandled rejection detected');

    if (server) {
      server.close(() => {
        errLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM Received');
  if (server) {
    server.close();
  }
});
