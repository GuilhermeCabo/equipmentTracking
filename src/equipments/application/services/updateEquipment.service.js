import { EquipmentsRepository } from '../../infra/database/repositories/equipments.repository.js';

export class UpdateEquipmentService {
  constructor() {
    this.repository = new EquipmentsRepository();
  }

  execute = async ({ equipmentId, payload }) => {
    await this.repository.persist({
      query: {
        _id: equipmentId,
      },
      payload,
    });
  };
}
