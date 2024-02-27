import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

import type { ICheckInsRepository } from './types';

export class CheckInsRepository implements ICheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prisma.checkIn.create({ data });

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: userId,
      },
    });

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIn = await prisma.checkIn.findMany({
      where: {
        id: '123',
      },
    });

    return checkIn;
  }
}
