import { IGymsRepository } from '@/repositories/gyms';

interface SearchGymsUseCaseParams {
  query: string;
  page: number;
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({ query, page }: SearchGymsUseCaseParams) {
    const gyms = await this.gymsRepository.searchMany(query, page);

    return { gyms };
  }
}
