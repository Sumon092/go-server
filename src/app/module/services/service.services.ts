import { Service } from '@prisma/client';
import prisma from '../../../constants/prisma';
import { ServiceData } from './service.interface';

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

const getServices = async () => {
  const services = await prisma.service.findMany();
  return services;
};

export const ServiceService = {
  addService,
  getServices,
};
