"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../module/auth/auth.route");
const review_route_1 = require("../module/reviewRating/review.route");
const service_route_1 = require("../module/services/service.route");
const user_route_1 = require("../module/user/user.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/auth',
        routes: auth_route_1.AuthRouter,
    },
    {
        path: '/user',
        routes: user_route_1.UserRouter,
    },
    {
        path: '/service',
        routes: service_route_1.ServiceRouter,
    },
    {
        path: '/review',
        routes: review_route_1.ReviewsRouter,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
