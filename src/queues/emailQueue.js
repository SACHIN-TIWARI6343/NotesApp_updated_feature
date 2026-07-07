// import bullmq
const { Queue } = require("bullmq");

// create a queue for email sending
const redisConnectionUrl = process.env.REDIS_URL ;
const emailQueue =  new Queue("emailQueue", {
  connection: {
    url: redisConnectionUrl,
  },
});

module.exports = {
  emailQueue,
};