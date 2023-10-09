import { EquipmentsRepository } from '../../infra/database/repositories/equipments.repository.js';

export class FindEquipmentsService {
  constructor() {
    this.repository = new EquipmentsRepository();
  }

  execute = async (filters = {}) => {
    const regexFilters = {};

    Object.keys(filters).forEach((key) =>
      Object.assign(regexFilters, {
        [key]: { $regex: filters[key], $options: 'i' },
      }),
    );

    return await this.repository.matching({ filters: regexFilters });
  };
}
