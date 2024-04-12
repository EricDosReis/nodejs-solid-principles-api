import type { FastifyReply, FastifyRequest } from 'fastify';

import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case';

export async function metrics(request: FastifyRequest, response: FastifyReply) {
  const userId = request.user.sub;

  const getUserMetricsUseCase = makeGetUserMetricsUseCase();

  const { checkInsCount } = await getUserMetricsUseCase.execute({
    userId,
  });

  return response.status(200).send({ checkInsCount });
}
