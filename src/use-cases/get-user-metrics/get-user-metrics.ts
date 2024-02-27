import { ICheckInsRepository } from '@/repositories/check-ins';

interface GetUserMetricsUseCaseParams {
  userId: string;
}

export class GetUserMetricsUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({ userId }: GetUserMetricsUseCaseParams) {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return { checkInsCount };
  }
}
