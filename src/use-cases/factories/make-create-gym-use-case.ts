import { GymsRepository } from '@/repositories/gyms/gyms';
import { CreateGymUseCase } from '../create-gym';

export function makeCreateGymUseCase() {
  const gymsRepository = new GymsRepository();
  const useCase = new CreateGymUseCase(gymsRepository);

  return useCase;
}
