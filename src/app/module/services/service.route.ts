import express from 'express';
import { ServiceController } from './service.controller';

const router = express.Router();

router.get('/:id', ServiceController.getServiceById);
router.get('/', ServiceController.getServices);
router.post(
  '/add-service',
  //   validateRequest(ServiceZodSchema.createServiceSchema),
  ServiceController.addService
);

export const ServiceRouter = router;
