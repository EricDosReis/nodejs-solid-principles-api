import type { FastifyInstance } from 'fastify';

import { authenticate } from './authenticate';
import { register } from './register';

export async function appRoutes(app: FastifyInstance) {
  app.post('/sessions', authenticate);
  app.post('/users', register);
}
