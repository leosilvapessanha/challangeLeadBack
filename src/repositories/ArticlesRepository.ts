import Articles from '../models/Articles';

interface CreateArticlesDTO {
  title: string;
  description: string;
}

class ArticlesRepository {
  private articles: Articles[];

  constructor() {
    this.articles = [];
  }

  public all(): Articles[] {
    return this.articles;
  }

  public findByName(title: string): Articles | null {
    const findSameArticles = this.articles.find(
      article => title === article.title,
    );

    return findSameArticles || null;
  }

  public create({ title, description }: CreateArticlesDTO): Articles {
    const article = new Articles({ title, description });

    this.articles.push(article);

    return article;
  }
}
export default ArticlesRepository;
