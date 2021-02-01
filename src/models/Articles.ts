import { uuid } from 'uuidv4';

class Articles {
  id: string;

  title: string;

  description: string;

  constructor(title: string, description: string) {
    this.id = uuid();
    this.title = title;
    this.description = description;
  }
}

export default Articles;
