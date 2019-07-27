import { Router, Request, Response } from "express";

export const process = async (req: Request, res: Response) => {
  const response = {
    time: new Date().toISOString(),
    method: req.method,
    headers: req.headers,
    path: req.path,
    query: req.query,
    // @ts-ignore
    duration: req.duration,
    body: !["GET", "DELETE"].includes(req.method) ? req.body : undefined
  };

  res.json(response);
};
