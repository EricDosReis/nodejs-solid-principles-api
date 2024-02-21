import { hash } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from '@/repositories/users/in-memory-users';
import { InvalidCredentialsError } from '../errors/invalid-credentials';
import { AuthenticateUseCase } from './authenticate';

let usersRepository: InMemoryUsersRepository;
let authenticateUseCase: AuthenticateUseCase;

describe('AuthenticateUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    authenticateUseCase = new AuthenticateUseCase(usersRepository);
  });

  it('should be able to authenticate', async () => {
    const email = 'user@email.com';

    await usersRepository.create({
      email,
      name: 'John Doe',
      password_hash: await hash('123456', 6),
    });

    const { user } = await authenticateUseCase.execute({
      email,
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it('should not be able to authenticate with wrong email', async () => {
    await usersRepository.create({
      email: 'user@email.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
    });

    await expect(() =>
      authenticateUseCase.execute({
        email: 'other_user@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      email: 'user@email.com',
      name: 'John Doe',
      password_hash: await hash('123456', 6),
    });

    await expect(() =>
      authenticateUseCase.execute({
        email: 'user@email.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
