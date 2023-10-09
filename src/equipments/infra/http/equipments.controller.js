import { EquipmentsSerializer } from './equipments.serializer.js';
import { CheckoutsSerializer } from './checkouts.serializer.js';

import { FindEquipmentsService } from '../../application/services/findEquipments.service.js';
import { CreateCheckoutService } from '../../application/services/createCheckout.service.js';
import { ReturnEquipmentService } from '../../application/services/returnEquipment.service.js';

export class EquipmentsController {
  constructor() {
    this.equipmentSerializer = new EquipmentsSerializer();
    this.checkoutSerializer = new CheckoutsSerializer();
    this.findEquipmentsService = new FindEquipmentsService();
    this.createCheckoutService = new CreateCheckoutService();
    this.returnEquipmentService = new ReturnEquipmentService();
  }

  find = async (request, response) => {
    const filters = request.query;
    const equipments = await this.findEquipmentsService.execute(filters);
    const serializedEquipments = equipments.map((equipment) =>
      this.equipmentSerializer.serialize(equipment),
    );
    return response.status(200).json(serializedEquipments);
  };

  checkoutEquipment = async (request, response) => {
    const { jobId } = request.body;
    const { equipmentId } = request.params;

    const checkout = await this.createCheckoutService.execute({
      jobId,
      equipmentId,
    });

    const serializedCheckout = this.checkoutSerializer.serialize(checkout);

    return response.status(201).json(serializedCheckout);
  };

  returnEquipment = async (request, response) => {
    const { equipmentId } = request.params;
    const { location } = request.body;

    await this.returnEquipmentService.execute({ equipmentId, location });

    return response.status(200).json({
      message: 'Success',
    });
  };
}
