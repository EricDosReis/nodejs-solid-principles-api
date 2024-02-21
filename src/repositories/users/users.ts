import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';

import type { IUsersRepository } from './types';

export class UsersRepository implements IUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string): Promise<{
    id: string;
    name: string;
    email: string;
    password_hash: string;
    created_at: Date;
  } | null> {
    throw new Error('Method not implemented.');
  }
}
