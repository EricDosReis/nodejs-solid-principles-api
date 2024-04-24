import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Search Gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to search gyms by title', async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Skatude Gym',
        description: 'The best gym for skateboarders',
        phone: '551199998888',
        latitude: -21.7893267,
        longitude: -48.1918281,
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Projeto WoW',
        description: 'The best gym for beginners skaters',
        phone: '551199997777',
        latitude: -21.7893267,
        longitude: -48.1918281,
      });

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'Skatude',
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Skatude Gym',
      }),
    ]);
  });
});
