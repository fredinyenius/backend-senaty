import { Router } from "express";
import * as controllers from "../controllers/categorias.controllers.js";

export const categoriaRouter = Router();

categoriaRouter.post("/categorias", controllers.crearCategoria);
categoriaRouter.get("/categorias", controllers.listarCategoria);
categoriaRouter.get("/categoria/:id", controllers.devolverCategoria);
categoriaRouter.delete("/categoria/:id", controllers.eliminarCategoria);