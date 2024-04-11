import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case';
import type { FastifyReply, FastifyRequest } from 'fastify';

export async function profile(request: FastifyRequest, response: FastifyReply) {
  const getUserProfile = makeGetUserProfileUseCase();

  const { user } = await getUserProfile.execute({ id: request.user.sub });

  const { id, email, name, created_at } = user;

  return response.status(200).send({
    user: {
      id,
      email,
      name,
      created_at,
    },
  });
}
