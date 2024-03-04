import { CheckInsRepository } from '@/repositories/check-ins';
import { GetUserCheckInsHistoryUseCase } from '../get-user-check-ins-history';

export function makeGetUserCheckInsHistoryUseCase() {
  const checkInsRepository = new CheckInsRepository();
  const useCase = new GetUserCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
}
