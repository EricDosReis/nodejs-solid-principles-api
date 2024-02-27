import { ICheckInsRepository } from '@/repositories/check-ins';

interface GetUserCheckInsHistoryUseCaseParams {
  userId: string;
  page: number;
}

export class GetUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({ userId, page }: GetUserCheckInsHistoryUseCaseParams) {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return { checkIns };
  }
}
