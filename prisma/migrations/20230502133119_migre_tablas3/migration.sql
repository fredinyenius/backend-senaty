/*
  Warnings:

  - You are about to alter the column `cantidad` on the `detalle_pedidos` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the column `total` on the `pedidos` table. All the data in the column will be lost.
  - Added the required column `precio` to the `detalle_pedidos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `detalle_pedidos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subTotal` to the `pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "detalle_pedidos" ADD COLUMN     "precio" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "cantidad" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "pedidos" DROP COLUMN "total",
ADD COLUMN     "subTotal" DOUBLE PRECISION NOT NULL;
