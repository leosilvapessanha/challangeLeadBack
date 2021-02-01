import { Router } from 'express';

import ArticlesRepository from '../repositories/ArticlesRepository';
import CreateArticleService from '../services/CreateArticleService';

const articlesRoutes = Router();

const articlesRepository = new ArticlesRepository();

articlesRoutes.get('/', (request, response) => {
  const listArticles = articlesRepository.all();

  return response.json(listArticles);
});

articlesRoutes.post('/', (request, response) => {
  try {
    const { title, description } = request.body;
    const createArticles = new CreateArticleService(articlesRepository);
    const article = createArticles.execute({ title, description });

    return response.json({ article });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default articlesRoutes;
