import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from '@/repositories/users/in-memory-users';
import { UserAlreadyExistsError } from '../errors/user-already-exists';
import { RegisterUseCase } from './register';

let usersRepository: InMemoryUsersRepository;
let registerUseCase: RegisterUseCase;

describe('RegisterUseCase', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    registerUseCase = new RegisterUseCase(usersRepository);
  });

  it('should not be able to use the same email twice', async () => {
    const email = 'user@email.com';

    await registerUseCase.execute({
      email,
      name: 'John Doe',
      password: '123456',
    });

    await expect(() =>
      registerUseCase.execute({
        email,
        name: 'John Doe',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it('should be able to register', async () => {
    const { user } = await registerUseCase.execute({
      email: 'user@email.com',
      name: 'John Doe',
      password: '123456',
    });

    expect(user.id).toEqual(expect.any(String));
  });
});
