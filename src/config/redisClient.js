const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file


const { createClient } = require("redis");
const logger = require("../utils/logger.js");

const redisClient = createClient({
 // url: process.env.REDIS_URL 
  url: "redis://redis:6379"  // Use the service name defined in docker-compose.yml for Redis
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