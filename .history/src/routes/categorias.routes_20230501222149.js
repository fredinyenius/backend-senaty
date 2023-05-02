import { Router } from "express";
import * as controllers from "../controllers/categorias.controllers.js";
import { eliminarCategoria } from "../controllers/categorias.controllers.js";
import { listarCategoria } from "../controllers/categorias.controllers.js";
import { devolverCategoria } from "../controllers/categorias.controllers.js";

export const categoriaRouter = Router();

categoriaRouter.post("/categorias",controllers.crearCategoria);
categoriaRouter.get("/categorias",listarCategoria);
categoriaRouter.get("/categorias",devolverCategoria);
categoriaRouter.delete("/categoria/:id",eliminarCategoria);