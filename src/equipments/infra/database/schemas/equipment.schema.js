import mongoose from 'mongoose';
import { Uuid } from '../../../../shared/domain/uuid.js';
import { equipmentStatusEnum } from '../../../domain/enum/equipmentStatus.enum.js';

const equipmentSchema = mongoose.Schema({
  _id: {
    type: String,
    default: Uuid.random,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: equipmentStatusEnum.values(),
  },
  location: {
    type: String,
    required: true,
    default: null,
  },
});

export const EquipmentModel = mongoose.model(
  'Equipment',
  equipmentSchema,
  'equipments',
);
