import uuidv4 from "uuid/v4";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      id?: string | number;
    }
  }
}

/**
 * Add Unique Request id to request (if not present)
 * `req.id`
 * @param fn Function to create unique id
 */
export const reqId = (fn?: Function) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.id = req.id || (typeof fn === "function" ? fn() : uuidv4());
  next();
};
