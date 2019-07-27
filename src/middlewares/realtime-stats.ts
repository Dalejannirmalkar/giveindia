import { Request, Response, NextFunction } from "express";
import socketio from "socket.io";
import app from "../app";
import onHeaders from "on-headers";
import { sendStats } from "../utils";

export const realtimeStats = () => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const io: socketio.Server = app.get("io");
  sendStats(io);

  onHeaders(res, function() {
    sendStats(io);
  });

  next();
};
