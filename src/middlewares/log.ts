import { Request, Response, NextFunction } from "express";
import onHeaders from "on-headers";
import { statistics } from "../utils";
import moment from "moment";

export const log = () => (req: Request, res: Response, next: NextFunction) => {
  statistics[req.method] = statistics[req.method] || [];

  function logRequest() {
    const stat = statistics[req.method].find(s => s.id === req.id);
    const now = Date.now();
    if (stat) {
      (stat.duration = moment(now).diff(
        moment(stat.startTime),
        "milliseconds"
      )),
        (stat.endTime = now);
    } else {
      statistics[req.method].push({
        endTime: now,
        id: req.id as string
      });
    }
  }

  onHeaders(res, logRequest);

  statistics[req.method].push({
    startTime: Date.now(),
    id: req.id as string
  });

  next();
};
