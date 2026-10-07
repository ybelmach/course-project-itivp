import type { RequestHandler } from 'express';
import { env } from '../config/env';
import { storage } from '../config/storage';
import { sequelize } from '../models';

export const live: RequestHandler = (_req, res) => {
  res.json({ status: 'ok' });
};

export const ready: RequestHandler = async (_req, res) => {
  const [database, fileStorage] = await Promise.allSettled([
    sequelize.authenticate(),
    storage.bucketExists(env.S3_BUCKET),
  ]);

  const checks = {
    database: database.status === 'fulfilled',
    storage: fileStorage.status === 'fulfilled' && fileStorage.value,
  };
  const ok = checks.database && checks.storage;

  res.status(ok ? 200 : 503).json({ status: ok ? 'ok' : 'unavailable', checks });
};
