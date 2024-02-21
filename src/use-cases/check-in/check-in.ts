import type { ICheckInsRepository } from '@/repositories/check-ins';
import type { IGymsRepository } from '@/repositories/gyms';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import { ResourceNotFoundError } from '../errors/resource-not-found';
import { MAX_DISTANCE_IN_KILOMETERS } from './constants';

interface CheckInUseCaseParams {
  gymId: string;
  userId: string;
  userLatitude: number;
  userLongitude: number;
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: ICheckInsRepository,
    private gymsRepository: IGymsRepository,
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseParams) {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    );

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error();
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );

    if (checkInOnSameDay) {
      throw new Error();
    }

    const checkIn = await this.checkInsRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    return { checkIn };
  }
}
