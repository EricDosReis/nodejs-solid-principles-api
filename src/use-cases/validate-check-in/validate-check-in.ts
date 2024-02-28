import dayjs from 'dayjs';

import type { ICheckInsRepository } from '@/repositories/check-ins';
import { MaxTimeToCheckInError } from '../errors/max-time-to-check-in';
import { ResourceNotFoundError } from '../errors/resource-not-found';
import { MAX_TIME_TO_CHECK_IN_MINUTES } from './constants';

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

    const offsetInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    );

    if (offsetInMinutesFromCheckInCreation > MAX_TIME_TO_CHECK_IN_MINUTES) {
      throw new MaxTimeToCheckInError();
    }

    checkIn.validated_at = new Date();

    await this.checkInsRepository.update(checkIn);

    return { checkIn };
  }
}
