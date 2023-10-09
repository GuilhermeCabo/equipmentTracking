import { EquipmentsRepository } from '../../infra/database/repositories/equipments.repository.js';

export class GetEquipmentByIdService {
  constructor() {
    this.repository = new EquipmentsRepository();
  }

  execute = async (equipmentId) => {
    return await this.repository.findById(equipmentId);
  };
}
