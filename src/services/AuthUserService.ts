import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

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

    const token = sign({}, '8e88f071b2ec71c711eef4d0b460a7b0', {
      subject: user.id,
      expiresIn: '1d',
    });
    return { user, token };
  }
}
export default AuthUserService;
