import { equipmentStatusEnum } from '../../domain/enum/equipmentStatus.enum.js';
import { BadData } from '../../../shared/domain/errors/badData.js';
import { checkoutStatusEnum } from '../../domain/enum/checkoutStatus.enum.js';

import { GetLastEquipmentCheckoutService } from './getLastEquipmentCheckout.service.js';
import { UpdateCheckoutService } from './updateCheckout.service.js';
import { UpdateEquipmentService } from './updateEquipment.service.js';

export class ReturnEquipmentService {
  constructor() {
    this.getLastEquipmentCheckoutService =
      new GetLastEquipmentCheckoutService();
    this.updateCheckoutService = new UpdateCheckoutService();
    this.updateEquipmentService = new UpdateEquipmentService();
  }

  execute = async ({ equipmentId, location }) => {
    const checkout = await this.getLastEquipmentCheckoutService.execute(
      equipmentId,
    );

    if (!checkout) {
      throw new BadData('Equipment is not rented!');
    }

    await this.updateCheckoutService.execute({
      checkoutId: checkout.id,
      payload: {
        status: checkoutStatusEnum.FINISHED,
      },
    });

    await this.updateEquipmentService.execute({
      equipmentId,
      payload: {
        status: equipmentStatusEnum.AVAILABLE,
        location,
      },
    });
  };
}
