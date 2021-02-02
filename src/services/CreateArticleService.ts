import { getCustomRepository } from 'typeorm';

import Articles from '../models/Articles';
import ArticlesRepository from '../repositories/ArticlesRepository';

interface Request {
  title: string;
  description: string;
}

class CreateArticleService {
  public async execute({ title, description }: Request): Promise<Articles> {
    const articlesRepository = getCustomRepository(ArticlesRepository);
    const findSameArticles = await articlesRepository.findByName(title);

    if (findSameArticles) {
      throw Error('artigo já existente');
    }

    const article = articlesRepository.create({ title, description });

    await articlesRepository.save(article);

    return article;
  }
}

export default CreateArticleService;
