import { IUsersRepository } from '@/repositories/users';
import { compare } from 'bcryptjs';
import { InvalidCredentialsError } from '../errors/invalid-credentials';

interface RegisterUseCaseParams {
  email: string;
  password: string;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: RegisterUseCaseParams) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isPasswordMatching = await compare(password, user.password_hash);

    if (!isPasswordMatching) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
