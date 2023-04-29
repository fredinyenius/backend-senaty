import { Router } from "express";
import * as controllers from "../controllers/productos.controllers.js";
import { listarProductos } from "../controllers/productos.controllers.js";
import { DevolverProducto } from "../controllers/productos.controllers.js";
import { actualizarProducto } from "../controllers/productos.controllers.js";
import { eliminarProducto } from "../controllers/productos.controllers.js";
//import { validarToken, esAdmin } from "../utils/wachiman.js";

export const productoRouter = Router();
 
// create producto
/**
 * @swagger
 * components:
 *   schemas:
 *   producto:
 *     
 * 
 * 
 * 
 * 
 */
 

productoRouter.post("/productos",controllers.crearProducto);

productoRouter.get("/productos", listarProductos);

productoRouter.get("/producto/:id", DevolverProducto);  

productoRouter.put("/producto/:id", actualizarProducto);

productoRouter.delete("/producto/:id",eliminarProducto);
    
