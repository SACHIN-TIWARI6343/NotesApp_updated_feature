const { createClient } = require("redis");
const logger = require("../utils/logger.js");

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://redis:6379",
});

redisClient.on("error", (err) => {
  logger.error("Redis Error:", err);
});

const connectRedis = async () => {
  await redisClient.connect();

  logger.info("Redis Connected");
};

module.exports = {
  redisClient,
  connectRedis,
};