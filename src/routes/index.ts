import { Router } from 'express';
import articlesRoutes from './articles.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/articles', articlesRoutes);
routes.use('/users', usersRoutes);

export default routes;
