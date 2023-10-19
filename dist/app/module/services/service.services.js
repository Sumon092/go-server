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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceService = void 0;
const prisma_1 = __importDefault(require("../../../constants/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const service_constants_1 = require("./service.constants");
const addService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { categories, service_image, title, city, address, type, rent } = data;
    const newService = yield prisma_1.default.service.create({
        data: {
            categories,
            service_image,
            title,
            city,
            address,
            type,
            rent,
        },
    });
    return newService;
});
const getServices = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: service_constants_1.serviceSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    const filterConditions = Object.keys(filterData)
        .map(key => {
        if (key === 'category') {
            return {
                category: {
                    title: filterData[key],
                },
            };
        }
        if (key === 'minRent') {
            return (0, service_constants_1.generateNumericFilterCondition)('rent', filterData[key], 'gte');
        }
        else if (key === 'maxRent') {
            return (0, service_constants_1.generateNumericFilterCondition)('rent', filterData[key], 'lte');
        }
        else {
            return {
                [key]: {
                    equals: filterData[key],
                },
            };
        }
    })
        .filter(condition => condition !== null);
    andConditions.push({
        AND: filterConditions,
    });
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : undefined;
    const result = yield prisma_1.default.service.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
        include: {
            bookings: true,
            review_ratings: true,
        },
    });
    const total = yield prisma_1.default.service.count();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getServiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.findUnique({
        where: {
            id,
        },
        include: {
            bookings: true,
            review_ratings: true,
        },
    });
    return result;
});
const updateService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.service.delete({
        where: {
            id,
        },
    });
    return result;
});
const getServicesByCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const services = yield prisma_1.default.service.findMany({
        where: {
            categories: category,
        },
        include: {
            bookings: true,
            review_ratings: true,
        },
    });
    return services;
});
const getServicesByCity = (city) => __awaiter(void 0, void 0, void 0, function* () {
    const services = yield prisma_1.default.service.findMany({
        where: {
            city: city,
        },
        include: {
            bookings: true,
            review_ratings: true,
        },
    });
    return services;
});
exports.ServiceService = {
    addService,
    getServices,
    getServiceById,
    updateService,
    deleteService,
    getServicesByCategory,
    getServicesByCity,
};
