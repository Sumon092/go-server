"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = exports.getReviewsByUser = exports.addReviewRating = void 0;
const prisma_1 = __importDefault(require("../../../constants/prisma"));
const addReviewRating = (serviceId, userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        throw new Error('User is not authenticated');
    }
    const newReviewRating = yield prisma_1.default.reviewRating.create({
        data: Object.assign(Object.assign({}, data), { userId,
            serviceId }),
    });
    return newReviewRating;
});
exports.addReviewRating = addReviewRating;
const getReviewsByUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield prisma_1.default.reviewRating.findMany({
        include: {
            user: true,
            services: true,
        },
    });
    return reviews;
});
exports.getReviewsByUser = getReviewsByUser;
exports.ReviewService = {
    addReviewRating: exports.addReviewRating,
    getReviewsByUser: exports.getReviewsByUser
};
