import { CheckoutsRepository } from '../../infra/database/repositories/checkouts.repository.js';

export class GetLastEquipmentCheckoutService {
  constructor() {
    this.repository = new CheckoutsRepository();
  }

  execute = async (equipmentId) => {
    const checkout = await this.repository.getLastEquipmentCheckout(
      equipmentId,
    );

    return checkout;
  };
}
