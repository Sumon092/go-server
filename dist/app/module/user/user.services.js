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
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../constants/prisma"));
const makeAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield prisma_1.default.user.update({
        where: { id },
        data: {
            role: client_1.User_Role.ADMIN,
        },
    });
    return admin;
});
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma_1.default.user.findMany();
    return users;
});
const addBooking = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { requestBooking, startDate, endDate, serviceId, userId } = data;
    const newBooking = yield prisma_1.default.booking.create({
        data: {
            requestBooking,
            startDate,
            endDate,
            services: {
                connect: { id: serviceId },
            },
            user: {
                connect: { id: id },
            },
        },
    });
    return newBooking;
});
const getBookings = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield prisma_1.default.booking.findMany({
        where: {
            requestBooking: true,
        },
    });
    return bookings;
});
const getBookingsByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield prisma_1.default.booking.findFirst({
        where: {
            userId: userId,
        },
    });
    return bookings;
});
const confirmBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const confirmedBooking = yield prisma_1.default.booking.update({
        where: { id: bookingId },
        data: { isConfirmed: true },
    });
    return confirmedBooking;
});
const cancelBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const cancel = yield prisma_1.default.booking.update({
        where: { id: bookingId },
        data: { isCancel: true },
    });
    return cancel;
});
exports.UserService = {
    makeAdmin,
    getUsers,
    addBooking,
    getBookings,
    getBookingsByUserId,
    confirmBooking,
    cancelBooking,
};
