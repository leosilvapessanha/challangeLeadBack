import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Articles from '../models/Articles';
import uploadConfig from '../config/upload';

interface Request {
  article_id: string;
  photo: string;
}

class ChangeArticleImageService {
  public async execute({ article_id, photo }: Request): Promise<Articles> {
    const articlesRepository = getRepository(Articles);

    const article = await articlesRepository.findOne(article_id);

    if (!article) {
      throw new Error('Somente usuários autenticados podem realizar essa ação');
    }

    if (article.photo) {
      const articlesPhotoPath = path.join(
        uploadConfig.directory,
        article.photo,
      );
      const articlesPhotoPathExists = await fs.promises.stat(articlesPhotoPath);
      if (articlesPhotoPathExists) {
        await fs.promises.unlink(articlesPhotoPath);
      }
    }
    article.photo = photo;
    await articlesRepository.save(article);
    return article;
  }
}
export default ChangeArticleImageService;
