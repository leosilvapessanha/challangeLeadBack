import express from 'express';
import routes from './routes';

const app = express();

app.get('/', (request, response) => {
  return response.json({ message: 'Hey Mate' });
});

app.listen(8000, () => {
  console.log('🚀');
});
