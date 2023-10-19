import express from 'express';
import { AuthRouter } from '../module/auth/auth.route';
import { ServiceRouter } from '../module/services/service.route';
import { UserRouter } from '../module/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRouter,
  },
  {
    path: '/user',
    routes: UserRouter,
  },
  {
    path: '/service',
    routes: ServiceRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
