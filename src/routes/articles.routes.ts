import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ArticlesRepository from '../repositories/ArticlesRepository';
import CreateArticleService from '../services/CreateArticleService';

const articlesRoutes = Router();

articlesRoutes.get('/', async (request, response) => {
  const articlesRepository = getCustomRepository(ArticlesRepository);
  const listArticles = await articlesRepository.find();

  return response.json(listArticles);
});

articlesRoutes.post('/', async (request, response) => {
  try {
    const { title, description } = request.body;
    const createArticles = new CreateArticleService();
    const article = await createArticles.execute({ title, description });

    return response.json({ article });
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default articlesRoutes;
