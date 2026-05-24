// import bullmq
const { Queue } = require("bullmq");

// create a queue for email sending
const emailQueue = new Queue("emailQueue", {
  connection: {
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  },
});

module.exports = {
  emailQueue
}