import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryCheckInsRepository } from '@/repositories/check-ins/in-memory-check-ins';
import { GetUserCheckInsHistoryUseCase } from './get-user-check-ins-history';

let checkInsRepository: InMemoryCheckInsRepository;
let getUserCheckInsHistoryUseCase: GetUserCheckInsHistoryUseCase;

describe('GetUserCheckInsHistory', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    getUserCheckInsHistoryUseCase = new GetUserCheckInsHistoryUseCase(
      checkInsRepository,
    );
  });

  it('should be able to get the user check-in history', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    });

    await checkInsRepository.create({
      gym_id: 'gym-02',
      user_id: 'user-01',
    });

    const { checkIns } = await getUserCheckInsHistoryUseCase.execute({
      userId: 'user-01',
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: 'gym-01' }),
      expect.objectContaining({ gym_id: 'gym-02' }),
    ]);
  });

  it('should get a paginated user check-in history', async () => {
    for (let i = 1; i <= 21; i++) {
      await checkInsRepository.create({
        gym_id: `gym-${i}`,
        user_id: 'user-01',
      });
    }

    const { checkIns } = await getUserCheckInsHistoryUseCase.execute({
      userId: 'user-01',
      page: 2,
    });

    expect(checkIns).toHaveLength(1);
    expect(checkIns).toEqual([expect.objectContaining({ gym_id: 'gym-21' })]);
  });
});
