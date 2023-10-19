import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import prisma from '../../../constants/prisma';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

const register = async (userData: User): Promise<Partial<User>> => {
  const { password, email, ...userInfo } = userData;

  const existingUser = await prisma.user.findFirst({
    where: { email },
  });
  if (existingUser) {
    throw new Error('Email already exists. Please use a different email.');
  }

  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bcrypt_salt_rounds)
  );

  const result = await prisma.user.create({
    data: {
      email,
      ...userInfo,
      password: hashedPassword,
    },
  });
  return result;
};

const SignIn = async (email: string, providedPassword: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new ApiError(httpStatus.OK, 'User not found');
  }
  const isPasswordValid = await bcrypt.compare(providedPassword, user.password);
  const { role, id: userId } = user;
  if (isPasswordValid) {
    const accessToken = jwtHelpers.createToken(
      { role, userId },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
    return accessToken;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password does not match');
  }
};

export const AuthService = {
  register,
  SignIn,
};
