import ms from "ms";
import { Router } from "express";
import { randomInt } from "../utils";
import { delay } from "../middlewares/delay";
import * as controller from "../controllers/process.controller";

const processRoutes = Router();

processRoutes.all(
  "/process(/*)?",
  delay(() => ms(`${randomInt(15, 30)}s`)),
  controller.process
);

export { processRoutes };
