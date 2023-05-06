import { Router } from "express";

import { crearPedido, crearDetallePedido } from "../controllers/pedidos.controllers.js";
//import { validarStock } from "../utils/wachiman.js";

export const pedidoRouter = Router();

//pedidoRouter.post("/pedidos", crearPedido);
//pedidoRouter.post("/detallePedidos", crearDetallePedido);
/*

pedidoRouter.post("/pedidos", pedidos);
pedidoRouter.post("/guarda-pedidos", guardarPedido);
pedidoRouter.post("/dar-pedido", darPedido);

pedidoRouter.post("/hacer-pedido", hacerPedido);

*/



pedidoRouter.post("/pedidos", crearPedido);
pedidoRouter.post("/detallePedidos", crearDetallePedido);