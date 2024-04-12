import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeGetUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-get-user-check-ins-history-use-case';

export async function history(request: FastifyRequest, response: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistoryQuerySchema.parse(request.query);
  const userId = request.user.sub;

  const getUserCheckInsHistoryUseCase = makeGetUserCheckInsHistoryUseCase();

  const { checkIns } = await getUserCheckInsHistoryUseCase.execute({
    userId,
    page,
  });

  return response.status(200).send({ checkIns });
}
