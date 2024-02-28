import { Gym, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates';
import type { FindManyNearbyParams, IGymsRepository } from './types';

const NUMBER_OF_ITEMS_PER_PAGE = 20;
const MAX_DISTANCE_FOR_NEARBY_GYMS_IN_KILOMETERS = 10;

export class InMemoryGymsRepository implements IGymsRepository {
  public gyms: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.gyms.push(gym);

    return gym;
  }

  async findById(id: string) {
    const gym = this.gyms.find(gym => gym.id == id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.gyms.filter(gym => {
      const distance = getDistanceBetweenCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        },
      );

      return distance < MAX_DISTANCE_FOR_NEARBY_GYMS_IN_KILOMETERS;
    });
  }

  async searchMany(query: string, page: number) {
    return this.gyms
      .filter(gym => gym.title.includes(query))
      .slice(
        (page - 1) * NUMBER_OF_ITEMS_PER_PAGE,
        page * NUMBER_OF_ITEMS_PER_PAGE,
      );
  }
}
