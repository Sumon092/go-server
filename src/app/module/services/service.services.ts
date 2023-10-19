import { Prisma, Service } from '@prisma/client';
import prisma from '../../../constants/prisma';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  generateNumericFilterCondition,
  serviceSearchableFields,
} from './service.constants';
import { IServiceFilterRequest, ServiceData } from './service.interface';

const addService = async (data: ServiceData): Promise<Service | null> => {
  const { categories, service_image, title, city, address, type, rent } = data;
  const newService = await prisma.service.create({
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
};

const getServices = async (
  filters: IServiceFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Service[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions: (Prisma.ServiceWhereInput | {})[] = [];
  if (searchTerm) {
    andConditions.push({
      OR: serviceSearchableFields.map(field => ({
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
            title: (filterData as any)[key],
          },
        };
      }
      if (key === 'minRent') {
        return generateNumericFilterCondition(
          'rent',
          (filterData as any)[key],
          'gte'
        );
      } else if (key === 'maxRent') {
        return generateNumericFilterCondition(
          'rent',
          (filterData as any)[key],
          'lte'
        );
      } else {
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }
    })
    .filter(condition => condition !== null);

  andConditions.push({
    AND: filterConditions,
  });

  const whereConditions: Prisma.ServiceWhereInput | undefined =
    andConditions.length > 0 ? { AND: andConditions } : undefined;
  const result = await prisma.service.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
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
  const total = await prisma.service.count();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getServiceById = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.findUnique({
    where: {
      id,
    },
    include: {
      bookings: true,
      review_ratings: true,
    },
  });
  return result;
};

const updateService = async (
  id: string,
  payload: Partial<Service>
): Promise<Service | null> => {
  const result = await prisma.service.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteService = async (id: string): Promise<Service | null> => {
  const result = await prisma.service.delete({
    where: {
      id,
    },
  });

  return result;
};

const getServicesByCategory = async (category: string) => {
  const services = await prisma.service.findMany({
    where: {
      categories: category,
    },
    include: {
      bookings: true,
      review_ratings: true,
    },
  });

  return services;
};

const getServicesByCity = async (city: string) => {
  const services = await prisma.service.findMany({
    where: {
      city: city,
    },
    include: {
      bookings: true,
      review_ratings: true,
    },
  });

  return services;
};

export const ServiceService = {
  addService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
  getServicesByCategory,
  getServicesByCity,
};
