/*
  Warnings:

  - Added the required column `fecha` to the `pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pedidos" ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL;
