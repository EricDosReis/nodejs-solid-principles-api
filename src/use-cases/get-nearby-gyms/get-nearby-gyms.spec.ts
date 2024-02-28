import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryGymsRepository } from '@/repositories/gyms/in-memory-gyms';
import { GetNearbyGymsUseCase } from './get-nearby-gyms';

let gymsRepository: InMemoryGymsRepository;
let getNearbyGymsUseCase: GetNearbyGymsUseCase;

describe('GetNearbyGymsUseCase', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    getNearbyGymsUseCase = new GetNearbyGymsUseCase(gymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Near Gym',
      description: 'The best gym for skateboarders',
      phone: '551199998888',
      latitude: -21.7893267,
      longitude: -48.1918281,
    });

    await gymsRepository.create({
      title: 'Far Gym',
      description: 'The best gym for beginner skaters',
      phone: '551199997777',
      latitude: -21.4059854,
      longitude: -48.5117171,
    });

    const { gyms } = await getNearbyGymsUseCase.execute({
      userLatitude: -21.7893267,
      userLongitude: -48.1918281,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })]);
  });
});
