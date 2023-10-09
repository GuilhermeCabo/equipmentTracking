import mongoose from 'mongoose';
import { Seed } from './seed.js';

export class MongoDb {
  static async connect() {
    const mongoURI = process.env.MONGO_DB_URL;
    const dbName = process.env.MONGO_DATABASE_NAME;

    await mongoose.connect(mongoURI, {
      dbName,
    });

    await Seed.run();

    console.log('Database connected!');
  }

  static async disconnect() {
    await mongoose.disconnect();
    console.log('Database disconnected!');
  }
}
