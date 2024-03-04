import { prisma } from '@/lib/prisma';
import type { Gym, Prisma } from '@prisma/client';

import { NUMBER_OF_ITEMS_PER_PAGE } from './constants';
import type { FindManyNearbyParams, IGymsRepository } from './types';

export class GymsRepository implements IGymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({ data });

    return gym;
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE (6371 * acos(cos(radians(${latitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${longitude})) + sin(radians(${latitude})) * sin(radians(latitude)))) <= 10
    `;

    return gyms;
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: NUMBER_OF_ITEMS_PER_PAGE,
      skip: (page - 1) * NUMBER_OF_ITEMS_PER_PAGE,
    });

    return gyms;
  }
}
