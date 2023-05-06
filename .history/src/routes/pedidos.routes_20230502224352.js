import { Router } from "express";

import { crearPedido, crearDetallePedido } from "../controllers/pedidos.controllers.js";
import { validarStock } from "../utils/wachiman.js";

export const pedidoRouter = Router();

pedidoRouter.post("/pedidos", validarStock, crearPedido);
pedidoRouter.post("/detallePedidos",validarStock, crearDetallePedido);