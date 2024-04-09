import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  JWT_SECRET: z.string(),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  PORT: z.coerce.number().default(3333),
});

const parsedEnvSchema = envSchema.safeParse(process.env);

if (parsedEnvSchema.success === false) {
  const errorMessage = 'Invalid environment variables!';

  console.error(errorMessage, parsedEnvSchema.error.format());

  throw new Error(errorMessage);
}

export const env = parsedEnvSchema.data;
