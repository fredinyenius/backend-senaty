import { Router } from "express";
import * as controllers from "../controllers/categorias.controllers.js";
import { validarToken, esAdmin } from "../utils/wachiman.js";

export const categoriaRouter = Router();

categoriaRouter.post("/categorias", validarToken, esAdmin, controllers.crearCategoria);
categoriaRouter.get("/categorias", controllers.listarCategoria);
categoriaRouter.get("/categoria/:id", controllers.devolverCategoria);
categoriaRouter.delete("/categoria/:id", controllers.eliminarCategoria);