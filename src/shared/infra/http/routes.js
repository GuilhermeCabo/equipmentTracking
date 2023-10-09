import { Router } from 'express';
import { equipmentsRouter } from '../../../equipments/infra/http/equipments.routes.js';

const router = new Router();

router.use('/equipments', equipmentsRouter);

export { router };
