import { Router } from "express";

import { crearPedido, crearDetallePedido } from "../controllers/pedidos.controllers.js";

export const pedidoRouter = Router();

pedidoRouter.post("/pedidos",crearPedido);
pedidoRouter.post("/detallePedidos",crearDetallePedido);