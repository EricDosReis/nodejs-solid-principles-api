import type { CheckIn, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import dayjs from 'dayjs';
import type { ICheckInsRepository } from './types';

const NUMBER_OF_ITEMS_PER_PAGE = 20;

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  public checkIns: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    };

    this.checkIns.push(checkIn);

    return checkIn;
  }

  async update(checkIn: CheckIn) {
    const checkInIndex = this.checkIns.findIndex(
      item => item.id === checkIn.id,
    );

    if (checkInIndex > 0) {
      this.checkIns[checkInIndex] = checkIn;
    }

    return checkIn;
  }

  async countByUserId(userId: string): Promise<number> {
    return this.checkIns.filter(checkIn => checkIn.user_id === userId).length;
  }

  async findById(id: string) {
    const checkIn = this.checkIns.find(checkIn => checkIn.id === id);

    if (!checkIn) {
      return null;
    }

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date');
    const endOfTheDay = dayjs(date).endOf('date');

    const checkInOnSameDate = this.checkIns.find(checkIn => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async findManyByUserId(userId: string, page: number) {
    return this.checkIns
      .filter(checkIn => checkIn.user_id === userId)
      .slice(
        (page - 1) * NUMBER_OF_ITEMS_PER_PAGE,
        page * NUMBER_OF_ITEMS_PER_PAGE,
      );
  }
}
