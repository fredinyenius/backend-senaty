import { Router } from "express";
import * as controllers from "../controllers/productos.controllers.js";

import { validarToken, esAdmin } from "../utils/wachiman.js";

export const productoRouter = Router();


productoRouter.post("/productos", controllers.crearProducto);

//productoRouter.get("/productos", validarToken, esAdmin, controllers.listarProductos);
productoRouter.get("/productos", controllers.listarProductos);

productoRouter.get("/producto/:id", controllers.DevolverProducto);

productoRouter.put("/producto/:id", controllers.actualizarProducto);

productoRouter.delete("/producto/:id", controllers.eliminarProducto);

productoRouter.get("/producto/slug/:slug", controllers.DevolverProductoSlug);