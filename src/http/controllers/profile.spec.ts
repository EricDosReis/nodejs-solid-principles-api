import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/app';

describe('Profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to get user profile', async () => {
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

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        created_at: expect.any(String),
      }),
    );
  });
});
