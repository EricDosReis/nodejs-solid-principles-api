import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { InMemoryCheckInsRepository } from '@/repositories/check-ins/in-memory-check-ins';
import { InMemoryGymsRepository } from '@/repositories/gyms/in-memory-gyms';
import { MaxDistanceError } from '../errors/max-distance';
import { MaxNumberOfCheckInsError } from '../errors/max-number-of-check-ins';
import { CheckInUseCase } from './check-in';

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let checkInUseCase: CheckInUseCase;

describe('CheckInUseCase', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    checkInUseCase = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: 'gym-01',
      title: 'Skatude Gym',
      description: 'The best gym for skateboarders',
      phone: '551199998888',
      latitude: -21.7893267,
      longitude: -48.1918281,
    });

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be able to check in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -21.7893267,
      userLongitude: -48.1918281,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check in twice on the same day', async () => {
    vi.setSystemTime(new Date(2023, 1, 22, 8, 0, 0));

    await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -21.7893267,
      userLongitude: -48.1918281,
    });

    await expect(() =>
      checkInUseCase.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -21.7893267,
        userLongitude: -48.1918281,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
  });

  it('should be able to check in on diferent days', async () => {
    vi.setSystemTime(new Date(2023, 1, 22, 8, 0, 0));

    await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -21.7893267,
      userLongitude: -48.1918281,
    });

    vi.setSystemTime(new Date(2023, 1, 23, 8, 0, 0));

    const { checkIn } = await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -21.7893267,
      userLongitude: -48.1918281,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it('should not be able to check-in far away from the gym', async () => {
    vi.setSystemTime(new Date(2023, 1, 22, 8, 0, 0));

    await checkInUseCase.execute({
      userId: 'user-01',
      gymId: 'gym-01',
      userLatitude: -21.7893267,
      userLongitude: -48.1918281,
    });

    await expect(() =>
      checkInUseCase.execute({
        userId: 'user-01',
        gymId: 'gym-01',
        userLatitude: -21.7902795,
        userLongitude: -48.1914865,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
