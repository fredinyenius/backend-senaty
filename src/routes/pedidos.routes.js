import { Router } from "express";

import { crearPedido, crearDetallePedido, pedidos, guardarPedido } from "../controllers/pedidos.controllers.js";
//import { validarStock } from "../utils/wachiman.js";

export const pedidoRouter = Router();

//pedidoRouter.post("/pedidos", crearPedido);
//pedidoRouter.post("/detallePedidos", crearDetallePedido);


pedidoRouter.post("/pedidos", pedidos);
pedidoRouter.post("/guarda-pedidos", guardarPedido);