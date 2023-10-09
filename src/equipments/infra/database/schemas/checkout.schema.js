import mongoose from 'mongoose';
import { Uuid } from '../../../../shared/domain/uuid.js';

import { checkoutStatusEnum } from '../../../domain/enum/checkoutStatus.enum.js';

const checkoutSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: Uuid.random,
    },
    user: {
      type: String,
      required: true,
    },
    jobId: {
      type: String,
      required: true,
    },
    equipmentId: {
      type: String,
      required: true,
      ref: 'Equipment',
    },
    status: {
      type: String,
      enum: checkoutStatusEnum.values(),
    },
  },
  { timestamps: true },
);

export const CheckoutModel = mongoose.model(
  'Checkout',
  checkoutSchema,
  'checkouts',
);
