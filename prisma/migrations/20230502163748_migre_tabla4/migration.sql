/*
  Warnings:

  - A unique constraint covering the columns `[usuario_id]` on the table `pedidos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "pedidos_usuario_id_key" ON "pedidos"("usuario_id");
