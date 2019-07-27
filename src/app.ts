import express from "express";
import * as bodyParser from "body-parser";
import * as routes from "./routes";
import { log } from "./middlewares/log";
import { reqId } from "./middlewares/reqId";
import { realtimeStats } from "./middlewares/realtime-stats";

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(express.static("public"));
app.use(reqId());
app.use(log());
app.use(realtimeStats());
app.use(bodyParser.json());
app.use(routes.processRoutes);
app.use(routes.statsRoutes);

export default app;
