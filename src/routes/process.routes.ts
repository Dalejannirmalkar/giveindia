import { Router } from "express";
import { randomInt } from "../utils";
import { delay } from "../middlewares/delay";
import * as controller from '../controllers/process.controller'

const processRoutes = Router();

processRoutes.all(
  "/process(/*)?",
  delay(randomInt(15, 30) * 1e3 /* ms */),
  controller.process
);

export { processRoutes };
