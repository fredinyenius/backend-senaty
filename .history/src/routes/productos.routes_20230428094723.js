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
 *     type: string
 *        properties:
 *            nombre:
 *              type: string
 *            precio: 
 *              type: number
 *       description: the producto precio
 *             stock:
 *              type: number
 *       description: the producto stock
 *        disponible:
 *              type: boolean
 *       description: the producto disponible
 *       descripcion:
 *              type: string
 *       description: the producto descripcion
 *            imagen:
 *              type: string
 *       description: the producto imagen
 *       procedencia:
 *              type: string
 *       description: the producto procedencia
 *       categoriaId:
 *              type: Integer
 *       description: the producto categoriaId
 *          required:
 *              -nombre
 *              -precio
 *              -stock
 *              -disponible
 *              -descripcion
 *              -imagen
 *              -procedencia
 *              -categoriaId
 *            example:
 *             nombre: nike
 *             precio: 80
 *             stock: 20
 *             disponible: true
 *             descripcion: para adulto
 *             imagen: foto
 *             procedencia: china
 *             categoriaId: 1
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
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
    
