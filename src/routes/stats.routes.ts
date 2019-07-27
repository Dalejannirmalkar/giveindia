import { Router } from "express";
import * as controller from '../controllers/stats.controller'

const statsRoutes = Router();

statsRoutes.get("/stats", controller.stats);

export { statsRoutes };
