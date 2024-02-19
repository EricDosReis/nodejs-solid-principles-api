import { hash } from 'bcryptjs';
import { describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from '@/repositories/users/in-memory-users';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import { AuthenticateUseCase } from './authenticate';

describe('AuthenticateUseCase', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

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
    const usersRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

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
    const usersRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

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
