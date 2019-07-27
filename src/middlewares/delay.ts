import { Request, Response, NextFunction } from "express";
import pDelay from "delay";

declare global {
  namespace Express {
    interface Request {
      duration?: number;
    }
  }
}

export const delay = (millis: number) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.duration = millis;

  await pDelay(millis);

  next();
};
