import { Router } from 'express';
import Articles from '../models/Articles';

const articlesRoutes = Router();

const articles: Articles[] = [];

articlesRoutes.post('/', (request, response) => {
  const { title, description }: Articles = request.body;

  const findSameArticles = articles.find(article => title === article.title);

  if (findSameArticles) {
    return response.status(400).json({ message: 'artigo já existente' });
  }

  const article = new Articles(title, description);
  articles.push(article);

  return response.json({ article });
});

export default articlesRoutes;
