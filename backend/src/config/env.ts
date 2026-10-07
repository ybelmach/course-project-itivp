import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(3000),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),

  DATABASE_URL: z.string().default('postgres://postgres:postgres@localhost:5432/study_materials'),

  JWT_SECRET: z.string().min(16).default('dev-only-secret-change-me'),
  JWT_EXPIRES_IN: z.string().default('1d'),

  S3_ENDPOINT: z.string().default('localhost'),
  S3_PORT: z.coerce.number().default(9000),
  S3_USE_SSL: z
    .enum(['true', 'false'])
    .default('false')
    .transform((value) => value === 'true'),
  S3_ACCESS_KEY: z.string().default('minioadmin'),
  S3_SECRET_KEY: z.string().default('minioadmin'),
  S3_BUCKET: z.string().default('materials'),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', z.flattenError(parsed.error).fieldErrors);
  process.exit(1);
}

if (parsed.data.NODE_ENV === 'production' && !process.env.JWT_SECRET) {
  console.error('JWT_SECRET must be set in production');
  process.exit(1);
}

export const env = parsed.data;
