import { Router } from 'express';

import AuthUserService from '../services/AuthUserService';

const sessionsRoutes = Router();

sessionsRoutes.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    const authenticateUser = new AuthUserService();
    const { user, token } = await authenticateUser.execute({ email, password });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: userPassword, ...allowedFields } = user;
    return response.json({ allowedFields, token });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionsRoutes;
