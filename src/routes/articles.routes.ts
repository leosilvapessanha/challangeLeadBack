import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import multer from 'multer';

import ArticlesRepository from '../repositories/ArticlesRepository';
import CreateArticleService from '../services/CreateArticleService';
import ensureAuth from '../middlewares/ensureAuth';
import uploadConfig from '../config/upload';

const articlesRoutes = Router();
const upload = multer(uploadConfig);

articlesRoutes.use(ensureAuth);

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

articlesRoutes.patch(
  '/images',
  upload.single('imgCover'),
  async (request, response) => {
    console.log(request.file);
    return response.json({ ok: true });
  },
);

export default articlesRoutes;
