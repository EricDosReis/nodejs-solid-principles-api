import type { Prisma, User } from '@prisma/client';

import type { IUsersRepository } from './types';

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const user = this.users.find(user => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
