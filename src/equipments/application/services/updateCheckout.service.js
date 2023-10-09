import { CheckoutsRepository } from '../../infra/database/repositories/checkouts.repository.js';

export class UpdateCheckoutService {
  constructor() {
    this.repository = new CheckoutsRepository();
  }

  execute = async ({ checkoutId, payload }) => {
    await this.repository.persist({
      query: {
        _id: checkoutId,
      },
      payload,
    });
  };
}
