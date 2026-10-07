import { Client } from 'minio';
import { env } from './env';

export const storage = new Client({
  endPoint: env.S3_ENDPOINT,
  port: env.S3_PORT,
  useSSL: env.S3_USE_SSL,
  accessKey: env.S3_ACCESS_KEY,
  secretKey: env.S3_SECRET_KEY,
});

export async function ensureBucket(): Promise<void> {
  if (!(await storage.bucketExists(env.S3_BUCKET))) {
    await storage.makeBucket(env.S3_BUCKET);
  }
}
