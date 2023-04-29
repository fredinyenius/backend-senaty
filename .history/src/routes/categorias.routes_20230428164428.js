import { Router } from "express";
import * as controllers from "../controllers/categorias.controllers.js";
 
export const categoriaRouter = Router();

categoriaRouter.post("/categorias",controllers.crearCategoria);
productoRouter.delete("/categoria/:id",controllers.eliminarCategoria);