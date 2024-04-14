-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CLIENT', 'WORKER', 'ADMIN');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'ACCEPTED', 'COMPLETED', 'CANCELLED', 'MODIFIED');

-- CreateEnum
CREATE TYPE "LeaveType" AS ENUM ('SICK_LEAVE', 'ANNUAL_LEAVE', 'UNPAID_LEAVE');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('SUCCESSFUL', 'PENDING', 'REFUNDED');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "bathroomNumber" INTEGER NOT NULL,
    "deskNumber" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_location" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "basePrice" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_location_userId_locationId_key" ON "user_location"("userId", "locationId");

-- CreateIndex
CREATE UNIQUE INDEX "service_name_key" ON "service"("name");

-- AddForeignKey
ALTER TABLE "user_location" ADD CONSTRAINT "user_location_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_location" ADD CONSTRAINT "user_location_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
