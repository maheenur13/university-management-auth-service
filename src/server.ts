import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errLogger, logger } from './shared/logger';

async function bootstrap() {
  try {
    await mongoose.connect(config.db_url as string);
    logger.info('Database connected!');

    app.listen(config.port, () => {
      logger.info(`Server Listening on port ${config.port}`);
    });
  } catch (error) {
    errLogger.error(error);
  }
}
bootstrap();
