import mongoose from 'mongoose';

import { equipmentsSeed } from './equipmentsSeed.js';

export class Seed {
  static run = async () => {
    const equipmentsCollection = mongoose.connection.collection('equipments');
    const equipments = equipmentsCollection.find().limit(1);

    // Entering the loop means there are already equipments created
    for await (const _ of equipments) {
      return;
    }

    await equipmentsCollection.insertMany(equipmentsSeed);
  };
}
