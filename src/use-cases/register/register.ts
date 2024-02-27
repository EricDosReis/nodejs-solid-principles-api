import { hash } from 'bcryptjs';

import type { IUsersRepository } from '@/repositories/users';
import { UserAlreadyExistsError } from '../errors/user-already-exists';

interface RegisterUseCaseParams {
  email: string;
  name: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, name, password }: RegisterUseCaseParams) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash: await hash(password, 6),
    });

    return { user };
  }
}
