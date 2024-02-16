import { hash } from 'bcryptjs';

import { IUsersRepository } from '@/repositories/users';

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
      throw new Error('Email already exists');
    }

    await this.usersRepository.create({
      email,
      name,
      password_hash: await hash(password, 6),
    });
  }
}
