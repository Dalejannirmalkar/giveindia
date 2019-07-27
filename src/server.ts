import app from "./app";
import { initSocket } from "./socketio";

export const server = app.listen(app.get("port"), () => {
  const io = initSocket(server);
  app.set('io', io);

  console.log(`Successfully connected to http://localhost:${app.get("port")}`);
});
