import type { ICheckInsRepository } from '@/repositories/check-ins';
import { ResourceNotFoundError } from '../errors/resource-not-found';

interface ValidateCheckInUseCaseParams {
  checkInId: string;
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({ checkInId }: ValidateCheckInUseCaseParams) {
    const checkIn = await this.checkInsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.update(checkIn);

    return { checkIn };
  }
}
