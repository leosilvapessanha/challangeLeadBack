import { EntityRepository, Repository } from 'typeorm';

import Articles from '../models/Articles';

@EntityRepository(Articles)
class ArticlesRepository extends Repository<Articles> {
  public async findByName(title: string): Promise<Articles | null> {
    const findSameArticles = await this.findOne({ where: { title } });

    return findSameArticles || null;
  }
}
export default ArticlesRepository;
