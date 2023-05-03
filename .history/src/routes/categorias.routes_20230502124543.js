import { Router } from "express";
import * as controllers from "../controllers/categorias.controllers.js";
import { validarToken, esAdmin } from "../utils/wachiman.js";

export const categoriaRouter = Router();

categoriaRouter.post("/categorias", validarToken, esAdmin, controllers.crearCategoria);
categoriaRouter.get("/categorias", validarToken, esAdmin, controllers.listarCategoria);
categoriaRouter.get("/categoria/:id", validarToken, esAdmin,controllers.devolverCategoria);
categoriaRouter.delete("/categoria/:id", validarToken, esAdmin,controllers.eliminarCategoria);