import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case';

export async function validate(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const validadeCheckInUseCase = makeValidateCheckInUseCase();

  await validadeCheckInUseCase.execute({
    checkInId,
  });

  return response.status(204).send();
}
