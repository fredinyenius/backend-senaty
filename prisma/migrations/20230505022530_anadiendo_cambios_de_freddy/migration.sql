/*
  Warnings:

  - Added the required column `descuento` to the `pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pedidos" ADD COLUMN     "descuento" DOUBLE PRECISION NOT NULL;
