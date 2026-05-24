const { Worker } = require("bullmq");

const {sendWelcomeEmail} = require("../utils/emailService.js");

const emailWorker = new Worker("emailQueue",  async (job) => {

    console.log (
       "Processing Job..."
    );

    console.log(job.data);

    await sendWelcomeEmail(job.data.email);

    console.log(
      "Welcome email sent to:",
      job.data.email
    );
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
  console.error(`Job ${job.id} failed with error:`, err.message);
});

emailWorker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
});

module.exports = { emailWorker };