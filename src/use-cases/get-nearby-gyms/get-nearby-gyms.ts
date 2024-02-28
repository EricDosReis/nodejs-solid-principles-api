import { IGymsRepository } from '@/repositories/gyms';

interface GetNearbyGymsUseCaseParams {
  userLatitude: number;
  userLongitude: number;
}

export class GetNearbyGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({ userLatitude, userLongitude }: GetNearbyGymsUseCaseParams) {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });

    return { gyms };
  }
}
