/*
  Warnings:

  - You are about to alter the column `rating` on the `booking` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `SmallInt`.

*/
-- AlterTable
ALTER TABLE "booking" ALTER COLUMN "rating" SET DATA TYPE SMALLINT;
