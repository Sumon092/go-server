import { Booking, User_Role } from '@prisma/client';
import prisma from '../../../constants/prisma';

const makeAdmin = async (id: string) => {
  const admin = await prisma.user.update({
    where: { id },
    data: {
      role: User_Role.ADMIN,
    },
  });
  return admin;
};

const getUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const addBooking = async (id: string, data: any) => {
  const { requestBooking, startDate, endDate, serviceId, userId } = data;
  const newBooking = await prisma.booking.create({
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
};

const getBookings = async () => {
  const bookings = await prisma.booking.findMany({
    where: {
      requestBooking: true,
    },
  });

  return bookings;
};
const getBookingsByUserId = async (
  userId: string
): Promise<Partial<Booking | null>> => {
  const bookings = await prisma.booking.findFirst({
    where: {
      userId: userId,
    },
  });

  return bookings;
};

const confirmBooking = async (bookingId: string): Promise<Booking | null> => {
  const confirmedBooking = await prisma.booking.update({
    where: { id: bookingId },
    data: { isConfirmed: true },
  });

  return confirmedBooking;
};

const cancelBooking = async (bookingId: string) => {
  await prisma.booking.update({
    where: { id: bookingId },
    data: { isConfirmed: false },
  });
};

export const UserService = {
  makeAdmin,
  getUsers,
  addBooking,
  getBookings,
  getBookingsByUserId,
  confirmBooking,
  cancelBooking,
};
