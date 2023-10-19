/*
  Warnings:

  - You are about to drop the column `rent` on the `bookings` table. All the data in the column will be lost.
  - Added the required column `rent` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bookings" DROP COLUMN "rent";

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "rent" INTEGER NOT NULL;
