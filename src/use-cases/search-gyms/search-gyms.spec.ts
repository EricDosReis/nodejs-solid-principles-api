import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryGymsRepository } from '@/repositories/gyms/in-memory-gyms';
import { SearchGymsUseCase } from './search-gyms';

let gymsRepository: InMemoryGymsRepository;
let searchGymsUseCase: SearchGymsUseCase;

describe('SearchGymsUseCase', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    searchGymsUseCase = new SearchGymsUseCase(gymsRepository);
  });

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Skatude Gym',
      description: 'The best gym for skateboarders',
      phone: '551199998888',
      latitude: -21.7893267,
      longitude: -48.1918281,
    });

    await gymsRepository.create({
      title: 'Wow Skate Gym',
      description: 'The best gym for beginner skaters',
      phone: '551199997777',
      latitude: -21.7893267,
      longitude: -48.1918281,
    });

    const { gyms } = await searchGymsUseCase.execute({
      query: 'Skatude',
      page: 1,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: 'Skatude Gym' })]);
  });

  it('should get a paginated gym search', async () => {
    for (let i = 1; i <= 21; i++) {
      await gymsRepository.create({
        title: `Wow Skate Gym ${i}`,
        description: 'The best gym for beginner skaters',
        phone: '551199997777',
        latitude: -21.7893267,
        longitude: -48.1918281,
      });
    }

    const { gyms } = await searchGymsUseCase.execute({
      query: 'Wow Skate Gym',
      page: 2,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Wow Skate Gym 21' }),
    ]);
  });
});
