// import bullmq
const { Queue } = require("bullmq");

// create a queue for email sending
const redisConnectionUrl = process.env.REDIS_URL || `redis://${process.env.REDIS_HOST || "redis"}:${process.env.REDIS_PORT || 6379}`;

const emailQueue = new Queue("emailQueue", {
  connection: {
    url: redisConnectionUrl,
  },
});

module.exports = {
  emailQueue,
};