const { Worker } = require("bullmq");
const logger = require("../utils/logger.js");

const {sendWelcomeEmail} = require("../utils/emailService.js");

const redisConnectionUrl = process.env.REDIS_URL || `redis://${process.env.REDIS_HOST || "redis"}:${process.env.REDIS_PORT || 6379}`;

const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    logger.info("Processing Job...");
    logger.info(`Job data: ${JSON.stringify(job.data)}`);
    await sendWelcomeEmail(job.data.email);
    logger.info(`Welcome email sent to: ${job.data.email}`);
  },
  {
    connection: {
      url: redisConnectionUrl,
    },
  }
);

// Error handling
emailWorker.on("failed", (job, err) => {
  logger.error(`Job ${job.id} failed with error: ${err.message}`);
});

emailWorker.on("completed", (job) => {
  logger.info(`Job ${job.id} completed successfully`);
});

module.exports = { emailWorker };