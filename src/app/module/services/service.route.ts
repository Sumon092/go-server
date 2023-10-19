import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
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
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ServiceController.deleteService
);
router.get('/:category', ServiceController.getServicesByCategory);
router.get('/:city', ServiceController.getServicesByCity);
router.get('/', ServiceController.getServices);
router.post(
  '/add-service',
  validateRequest(ServiceZodSchema.createServiceSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  ServiceController.addService
);

router.patch(
  '/update-service',
  validateRequest(ServiceZodSchema.updateServiceSchema),
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN),
  validateRequest(ServiceZodSchema.createServiceSchema),
  ServiceController.addService
);

export const ServiceRouter = router;
