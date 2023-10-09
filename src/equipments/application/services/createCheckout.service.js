import { BadData } from '../../../shared/domain/errors/badData.js';
import { CheckoutsRepository } from '../../infra/database/repositories/checkouts.repository.js';
import { NotFound } from '../../../shared/domain/errors/notFound.js';

import { equipmentStatusEnum } from '../../domain/enum/equipmentStatus.enum.js';
import { checkoutStatusEnum } from '../../domain/enum/checkoutStatus.enum.js';

import { GetLastEquipmentCheckoutService } from './getLastEquipmentCheckout.service.js';
import { GetEquipmentByIdService } from './getEquipmentById.service.js';
import { UpdateEquipmentService } from './updateEquipment.service.js';

export class CreateCheckoutService {
  constructor() {
    this.repository = new CheckoutsRepository();
    this.getLastEquipmentCheckoutService =
      new GetLastEquipmentCheckoutService();
    this.getEquipmentByIdService = new GetEquipmentByIdService();
    this.updateEquipmentService = new UpdateEquipmentService();
  }

  execute = async ({ jobId, equipmentId }) => {
    const equipmentExists = await this.getEquipmentByIdService.execute(
      equipmentId,
    );

    if (!equipmentExists) throw new NotFound('Equipment');

    const equipmentAlreadyInUse =
      await this.getLastEquipmentCheckoutService.execute(equipmentId);

    if (equipmentAlreadyInUse) {
      throw new BadData('Equipment not available!');
    }

    const checkout = await this.repository.persist({
      query: {},
      payload: {
        jobId,
        equipmentId,
        status: checkoutStatusEnum.ON_GOING,
      },
    });

    await this.updateEquipmentService.execute({
      equipmentId,
      payload: {
        status: equipmentStatusEnum.RENTED,
      },
    });

    return checkout;
  };
}
