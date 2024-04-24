import type { FastifyReply, FastifyRequest } from 'fastify';

export function verifyUserRole(role: 'ADMIN' | 'MEMBER') {
  return async (request: FastifyRequest, response: FastifyReply) => {
    const { role: userRole } = request.user;

    if (role !== userRole) {
      return response.status(401).send({ message: 'Unauthorized.' });
    }
  };
}
