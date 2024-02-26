import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryGymsRepository } from '@/repositories/gyms/in-memory-gyms';
import { CreateGymUseCase } from './create-gym';

let gymsRepository: InMemoryGymsRepository;
let createGymUseCase: CreateGymUseCase;

describe('CreateGymUseCase', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    createGymUseCase = new CreateGymUseCase(gymsRepository);
  });

  it('should be able create a gym', async () => {
    const { gym } = await createGymUseCase.execute({
      title: 'Skatude Gym',
      description: 'The best gym for skateboarders',
      phone: '551199998888',
      latitude: -21.7893267,
      longitude: -48.1918281,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
