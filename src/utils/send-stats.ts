import socketio from 'socket.io'
import {
  getStats
} from "./statistics";

export const sendStats = (io: socketio.Server) => {
  const response = getStats();

  io.emit('stats', response)
}
