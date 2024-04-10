import 'dotenv/config';
import { execSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import { Environment } from 'vitest';

import { prisma } from '../src/lib/prisma';

function generateDatabaseURL(schema: string) {
  const envDatabaseURL = process.env.DATABASE_URL;

  if (!envDatabaseURL) {
    throw new Error('Please provide the DATABASE_URL environment variable');
  }

  const url = new URL(envDatabaseURL);

  url.searchParams.set('schema', schema);

  return url.toString();
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  setup(global, options) {
    const schema = randomUUID();
    const databaseURL = generateDatabaseURL(schema);

    process.env.DATABASE_URL = databaseURL;

    execSync('npx prisma migrate deploy');

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema} CASCADE"`,
        );

        await prisma.$disconnect();
      },
    };
  },
};
