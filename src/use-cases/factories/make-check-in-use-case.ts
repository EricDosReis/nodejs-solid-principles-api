import { CheckInsRepository } from '@/repositories/check-ins';
import { GymsRepository } from '@/repositories/gyms/gyms';
import { CheckInUseCase } from '../check-in';

export function makeCheckInUseCase() {
  const checkInsRepository = new CheckInsRepository();
  const gymsRepository = new GymsRepository();
  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository);

  return useCase;
}
