import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
// import multer from 'multer';

import ArticlesRepository from '../repositories/ArticlesRepository';
import CreateArticleService from '../services/CreateArticleService';
import ensureAuth from '../middlewares/ensureAuth';
// import uploadConfig from '../config/upload';
// import  '../config/upload'
// import ChangeArticleImageService from '../services/ChangeArticleImageService';

const articlesRoutes = Router();
// const upload = multer(uploadConfig);

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

// articlesRoutes.patch(
//   '/images',
//   upload.single('imgCover'),
//   async (request: Request, response: Response): Promise<Response> => {
//     try {
//       const article = new ChangeArticleImageService();
//       const newArticle = await article.execute({
//         article_id: request.body.article_id,
//         photo: request.file.filename,
//       });
//       return response.json(newArticle);
//       console.log(newArticle);
//     } catch (err) {
//       return response.status(400).json({ error: err.message });
//     }
//   },
// );
// articlesRoutes.post(
//   '/images',
//   upload.single('imgCover'),
//   async (request, response) => {
//     try {
//       const article = new ChangeArticleImageService();
//       await article.execute({
//         article_id: request.article_id.,
//         photo: request.file.filename,
//       });
//       return response.json({ ok: true });
//     } catch (err) {
//       return response.status(400).json({ error: err.message });
//     }
//     console.log(art);
//   },
// );

export default articlesRoutes;
