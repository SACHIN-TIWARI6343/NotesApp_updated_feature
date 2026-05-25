const { Worker } = require("bullmq");
const logger = require("../utils/logger.js");

const {sendWelcomeEmail} = require("../utils/emailService.js");

const emailWorker = new Worker("emailQueue",  async (job) => {

    logger.info("Processing Job...");

    logger.info(`Job data: ${JSON.stringify(job.data)}`);

    await sendWelcomeEmail(job.data.email);

    logger.info(`Welcome email sent to: ${job.data.email}`);
  },

  {
    connection: {
      host: "127.0.0.1",
      port: 6379,
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