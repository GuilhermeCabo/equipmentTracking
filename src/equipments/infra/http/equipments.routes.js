import { Router } from 'express';
import { EquipmentsController } from './equipments.controller.js';
import asyncHandler from '../../../shared/infra/http/asyncHandler.js';

const equipmentsRouter = new Router();
const equipmentsController = new EquipmentsController();

equipmentsRouter.get('/', asyncHandler(equipmentsController.find));

equipmentsRouter.post(
  '/:equipmentId/checkout',
  asyncHandler(equipmentsController.checkoutEquipment),
);

equipmentsRouter.post(
  '/:equipmentId/checkout/return',
  asyncHandler(equipmentsController.returnEquipment),
);

export { equipmentsRouter };
