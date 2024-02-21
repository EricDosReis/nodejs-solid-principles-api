import { IUsersRepository } from '@/repositories/users';
import { ResourceNotFoundError } from '../errors/resource-not-found';

interface GetUserProfileUseCaseParams {
  id: string;
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ id }: GetUserProfileUseCaseParams) {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    return { user };
  }
}
