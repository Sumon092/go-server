"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRouter = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const service_controller_1 = require("./service.controller");
const service_validation_1 = require("./service.validation");
const router = express_1.default.Router();
router.get('/:id', service_controller_1.ServiceController.getServiceById);
router.patch('/:id', (0, validateRequest_1.default)(service_validation_1.ServiceZodSchema.updateServiceSchema), service_controller_1.ServiceController.updateService);
router.delete('/:id', service_controller_1.ServiceController.deleteService);
router.get('/:category', service_controller_1.ServiceController.getServicesByCategory);
router.get('/:city', service_controller_1.ServiceController.getServicesByCity);
router.get('/', service_controller_1.ServiceController.getServices);
router.post('/add-service', 
//   validateRequest(ServiceZodSchema.createServiceSchema),
service_controller_1.ServiceController.addService);
exports.ServiceRouter = router;
