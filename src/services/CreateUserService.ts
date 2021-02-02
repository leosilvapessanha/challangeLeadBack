import { getRepository } from 'typeorm';
import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExists = await userRepository.findOne({ where: { email } });

    if (checkUserExists) {
      throw new Error('Usuário já cadastrado');
    }
    const user = userRepository.create({
      email,
      password,
    });

    await userRepository.save(user);
    return user;
  }
}

export default CreateUserService;
