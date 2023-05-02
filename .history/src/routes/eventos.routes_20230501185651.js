import { Router } from "express";
import * as controllers from "../controllers/eventos.controllers.js";

export const eventosRouter = Router();

eventosRouter.route("/productos").get(controllers.probarS3);