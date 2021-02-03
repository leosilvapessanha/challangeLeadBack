import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import ensureAuth from '../config/auth';

interface Request {
  email: string;
  password: string;
}

class AuthUserService {
  public async execute({
    email,
    password,
  }: Request): Promise<{ user: User; token: string }> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('combinação de email e password incorreta');
    }
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('combinação de email e password incorreta');
    }

    const { secret, expiresIn } = ensureAuth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    return { user, token };
  }
}
export default AuthUserService;
