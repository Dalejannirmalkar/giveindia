import { Server } from "http";
import socketio, { Socket } from "socket.io";
import { getStats } from "./utils";

const addSocketEvents = (socket: Socket) => {
  const response = getStats();
  socket.emit("stats", response);
  socket.on("stats_change", () => {
    socket.emit("stats", response);
  });
};

export const initSocket = (server: Server) => {
  const io = socketio(server, {
    serveClient: true
  });

  io.on("connection", addSocketEvents);

  return io;
};
