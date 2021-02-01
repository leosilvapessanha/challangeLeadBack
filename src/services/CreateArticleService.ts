import Articles from '../models/Articles';
import ArticlesRepository from '../repositories/ArticlesRepository';

interface Request {
  title: string;
  description: string;
}

class CreateArticleService {
  // private articlesRepository: ArticlesRepository;

  constructor(private articlesRepository: ArticlesRepository) {
    this.articlesRepository = articlesRepository;
  }

  public execute({ title, description }: Request): Articles {
    const findSameArticles = this.articlesRepository.findByName(title);

    if (findSameArticles) {
      throw Error('artigo já existente');
    }

    const article = this.articlesRepository.create({ title, description });

    return article;
  }
}

export default CreateArticleService;
