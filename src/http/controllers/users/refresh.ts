import type { FastifyReply, FastifyRequest } from 'fastify';

export async function refresh(request: FastifyRequest, response: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true });

  const userId = request.user.sub;

  const token = await response.jwtSign(
    {},
    {
      sign: {
        sub: userId,
      },
    },
  );

  const refreshToken = await response.jwtSign(
    {},
    {
      sign: {
        sub: userId,
        expiresIn: '7d',
      },
    },
  );

  return response
    .setCookie('refreshToken', refreshToken, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: true,
    })
    .status(200)
    .send({ token });
}
