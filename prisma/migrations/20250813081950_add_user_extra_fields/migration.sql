-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "birthday" TIMESTAMP(3),
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "shippingAddress" TEXT;
