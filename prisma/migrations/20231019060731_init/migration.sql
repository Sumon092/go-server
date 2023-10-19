-- CreateEnum
CREATE TYPE "User_Role" AS ENUM ('ADMIN', 'SUPER_ADMIN', 'USER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "role" "User_Role" NOT NULL DEFAULT 'USER',
    "password" TEXT NOT NULL,
    "contact_no" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
