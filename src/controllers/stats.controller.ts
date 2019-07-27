import { Request, Response } from "express";

import {
  getStats
} from "../utils";

export const stats = async (req: Request, res: Response) => {
  const response = getStats();
  res.json(response);
};
