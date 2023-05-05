import { Router } from "express";
import * as controllers from "../controllers/productos.controllers.js";

import { validarToken, esAdmin } from "../utils/wachiman.js";

export const productoRouter = Router();


productoRouter.post("/productos", validarToken, esAdmin, controllers.crearProducto);

productoRouter.get("/productos", validarToken, esAdmin, controllers.listarProductos);

productoRouter.get("/producto/:id", validarToken, esAdmin, controllers.DevolverProducto);

productoRouter.put("/producto/:id", validarToken, esAdmin, controllers.actualizarProducto);

productoRouter.delete("/producto/:id", validarToken, esAdmin, controllers.eliminarProducto);

