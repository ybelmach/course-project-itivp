import { app } from './app';
import { env } from './config/env';
import { ensureBucket } from './config/storage';
import { sequelize } from './models';

async function start(): Promise<void> {
  await sequelize.authenticate();
  await ensureBucket();

  app.listen(env.PORT, () => {
    console.log(`API listening on port ${env.PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
