import { Repository } from '../../../../shared/infra/database/repository.js';
import { EquipmentModel } from '../schemas/equipment.schema.js';

export class EquipmentsRepository extends Repository {
  constructor() {
    super(EquipmentModel);
  }
}
