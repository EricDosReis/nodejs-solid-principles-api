import { UsersRepository } from '@/repositories/users';
import { AuthenticateUseCase } from '../authenticate';

export function makeAuthenticateUseCase() {
  const usersRepository = new UsersRepository();
  const useCase = new AuthenticateUseCase(usersRepository);

  return useCase;
}
