import express from 'express';

import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

app.get('/', (request, response) => {
  return response.json({ message: 'Hey Mate' });
});

app.listen(8000, () => {
  console.log('🚀');
});
