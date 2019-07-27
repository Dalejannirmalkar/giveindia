import redis from "redis";

require("redis-streams")(redis);

const config = require("config").util.toObject();

export const client = redis.createClient(config.redis); // create client using your options and auth
