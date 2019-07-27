import { Request, Response, NextFunction } from "express";
import ms from "ms";
import morgan, { TokenIndexer } from "morgan";
import onHeaders from "on-headers";
import { redisLogKeyPrefix } from "../constants";
import { client as redisClient } from "../redis";
import { statistics } from "../utils";
import moment from "moment";

function format(tokens: any, req: Request, res: Response) {
  console.dir({ tokens });
}

morgan.token("duration", function getId(req: Request) {
  return String(req.duration);
});

const _log = () =>
  morgan("common", {
    // @ts-ignore
    stream: redisClient.writeStream(`${redisLogKeyPrefix}:`, ms("1w"))
  });

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
