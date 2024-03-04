import { GymsRepository } from '@/repositories/gyms/gyms';
import { GetNearbyGymsUseCase } from '../get-nearby-gyms/get-nearby-gyms';

export function makeGetNearbyGymsUseCase() {
  const gymsRepository = new GymsRepository();
  const useCase = new GetNearbyGymsUseCase(gymsRepository);

  return useCase;
}
