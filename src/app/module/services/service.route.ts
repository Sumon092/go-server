import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ServiceController } from './service.controller';
import { ServiceZodSchema } from './service.validation';

const router = express.Router();

router.get('/:id', ServiceController.getServiceById);
router.patch(
  '/:id',
  validateRequest(ServiceZodSchema.updateServiceSchema),
  ServiceController.updateService
);
router.delete('/:id', ServiceController.deleteService);
router.get('/:category', ServiceController.getServicesByCategory);
router.get('/:city', ServiceController.getServicesByCity);
router.get('/', ServiceController.getServices);
router.post(
  '/add-service',
  //   validateRequest(ServiceZodSchema.createServiceSchema),
  ServiceController.addService
);

export const ServiceRouter = router;
