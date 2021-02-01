import { Router } from 'express';
import articlesRoutes from './articles.routes';

const routes = Router();

routes.use('/articles', articlesRoutes);

export default routes;
