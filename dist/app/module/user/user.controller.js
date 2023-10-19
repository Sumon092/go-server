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
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_services_1 = require("./user.services");
const makeAdmin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield user_services_1.UserService.makeAdmin(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'User updated as a admin',
            data: result,
        });
    }
    catch (error) {
        throw new Error(error.massage);
    }
}));
const getUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.UserService.getUsers();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'user fetched successfully',
            data: result,
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}));
const addBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const data = req.body;
        const result = yield user_services_1.UserService.addBooking(id, data);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Booking added successfully',
            data: result,
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}));
const getBookings = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_services_1.UserService.getBookings();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Booking fetched successfully',
            data: result,
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}));
const getBookingById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const id = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.userId;
        const result = yield user_services_1.UserService.getBookingsByUserId(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'users Booking fetched successfully',
            data: result,
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}));
const confirmBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id === undefined) {
            return res.status(http_status_1.default.BAD_REQUEST).json({
                success: false,
                message: 'Booking ID is required',
            });
        }
        const result = yield user_services_1.UserService.confirmBooking(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Booking confirmed',
            data: result,
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}));
const cancelBooking = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id === undefined) {
            return res.status(http_status_1.default.BAD_REQUEST).json({
                success: false,
                message: 'Booking ID is required',
            });
        }
        const result = yield user_services_1.UserService.cancelBooking(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Booking cancelled',
            data: result,
        });
    }
    catch (error) {
        throw new Error(error.message);
    }
}));
exports.UserController = {
    makeAdmin,
    getUsers,
    addBooking,
    getBookings,
    getBookingById,
    confirmBooking,
    cancelBooking,
};
