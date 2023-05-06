import { Router } from "express";

import { crearPedido } from "../controllers/pedidos.controllers.js";

export const pedidoRouter = Router();

pedidoRouter.post("/pedidos",crearPedido);