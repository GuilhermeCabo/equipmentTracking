import express from 'express';
import logger from 'pino-http';
import swaggerUi from 'swagger-ui-express';

import { swagger } from './swagger.js';
import { router } from './shared/infra/http/routes.js';

const app = express();

app.use(logger());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swagger));

app.use(router);

app.use((_, response) => {
  return response.status(404).json({
    status: 404,
    errorType: 'Not Found',
    message: 'Endpoint not found',
  });
});

export { app };
