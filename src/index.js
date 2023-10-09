import { MongoDb } from './shared/infra/database/mongoDb.js';
import { app } from './app.js';

await MongoDb.connect();

app.listen(process.env.PORT, () =>
  console.log('Server running on http://localhost:3000'),
);
