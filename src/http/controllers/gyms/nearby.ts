import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeGetNearbyGymsUseCase } from '@/use-cases/factories/make-get-nearby-gyms-use-case';

export async function nearby(request: FastifyRequest, response: FastifyReply) {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.coerce.number().refine(value => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query);

  const getNearbyGymsUseCase = makeGetNearbyGymsUseCase();

  const { gyms } = await getNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return response.status(200).send({ gyms });
}
