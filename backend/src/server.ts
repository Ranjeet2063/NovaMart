import app from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

const bootstrap = async (): Promise<void> => {
  await connectDB();
  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`NovaMart API running on port ${env.port}`);
  });
};

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
