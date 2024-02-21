import { Gym } from '@prisma/client';

import type { IGymsRepository } from './types';

export class InMemoryGymsRepository implements IGymsRepository {
  public gyms: Gym[] = [];

  async findById(id: string) {
    const gym = this.gyms.find(gym => gym.id == id);

    if (!gym) {
      return null;
    }

    return gym;
  }
}
