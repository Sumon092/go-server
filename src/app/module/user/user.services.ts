import { User_Role } from '@prisma/client';
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

export const UserService = {
  makeAdmin,
  getUsers,
};
