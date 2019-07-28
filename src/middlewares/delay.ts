import { Request, Response, NextFunction } from "express";
import pDelay from "delay";

declare global {
  namespace Express {
    interface Request {
      duration?: number;
    }
  }
}

export const delay = (millis: number | Function) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (typeof millis === "function") {
    req.duration = millis();
  } else {
    req.duration = millis;
  }

  await pDelay(req.duration as number);

  next();
};
