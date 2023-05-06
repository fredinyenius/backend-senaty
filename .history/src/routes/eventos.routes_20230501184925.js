import { Router } from "express";
import * as controllers from "../controllers/eventos.controllers.js";

export const eventosRouter = Router();

eventosRouter.route("/imagen").get(controllers.probarS3);