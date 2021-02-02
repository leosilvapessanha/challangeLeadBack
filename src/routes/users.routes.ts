import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRoutes = Router();

usersRoutes.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ email, password });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...allowedFields } = user;

    return response.json(allowedFields);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usersRoutes;
