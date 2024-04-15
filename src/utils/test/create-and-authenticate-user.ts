import type { FastifyInstance } from 'fastify';
import request from 'supertest';

export async function createAndAuthenticateUser(app: FastifyInstance) {
  const email = 'eric@email.com';
  const password = '123456';

  await request(app.server).post('/users').send({
    name: 'Eric dos Reis',
    email,
    password,
  });

  const authResponse = await request(app.server).post('/sessions').send({
    email,
    password,
  });

  const { token } = authResponse.body;

  return { token };
}
