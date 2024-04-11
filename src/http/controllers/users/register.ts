import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists';
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case';

export async function register(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string().min(6),
  });

  const { email, name, password } = registerBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    const user = await registerUseCase.execute({
      email,
      name,
      password,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return response.status(409).send({ message: error.message });
    }

    throw error;
  }

  return response.status(201).send();
}
