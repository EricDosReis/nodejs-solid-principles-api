import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

import type { IGymsRepository } from './types';

export class GymsRepository implements IGymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({ data });

    return gym;
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }
}
