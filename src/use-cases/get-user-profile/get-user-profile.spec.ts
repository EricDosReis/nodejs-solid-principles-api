import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from '@/repositories/users/in-memory-users';
import { ResourceNotFoundError } from '../errors/resource-not-found';
import { GetUserProfileUseCase } from './get-user-profile';

let usersRepository: InMemoryUsersRepository;
let getUserProfileUseCase: GetUserProfileUseCase;

describe('GetUserProfileUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);
  });

  it('should get user profile', async () => {
    const createdUser = await usersRepository.create({
      email: 'user@email.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
    });

    const { user } = await getUserProfileUseCase.execute({
      id: createdUser.id,
    });

    expect(user.id).toEqual(createdUser.id);
  });

  it('should not get user profile if not exists', async () => {
    await expect(() =>
      getUserProfileUseCase.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
