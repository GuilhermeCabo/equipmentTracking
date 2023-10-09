import { Repository } from '../../../../shared/infra/database/repository.js';
import { checkoutStatusEnum } from '../../../domain/enum/checkoutStatus.enum.js';
import { CheckoutModel } from '../schemas/checkout.schema.js';

export class CheckoutsRepository extends Repository {
  constructor() {
    super(CheckoutModel);
  }

  getLastEquipmentCheckout = async (equipmentId) => {
    const pipeline = [
      {
        $match: {
          equipmentId,
          status: checkoutStatusEnum.ON_GOING,
        },
      },
      {
        $limit: 1,
      },
      {
        $lookup: {
          from: 'equipments',
          foreignField: '_id',
          localField: 'equipmentId',
          as: 'equipment',
        },
      },
      {
        $project: {
          id: '$_id',
          jobId: 1,
          equipment: { $first: '$equipment' },
          createdAt: 1,
          _id: 0,
        },
      },
    ];

    const [equipmentCheckout] = await this.aggregation(pipeline);

    return equipmentCheckout;
  };
}
