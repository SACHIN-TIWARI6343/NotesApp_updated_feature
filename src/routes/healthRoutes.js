const express = require("express");
const { redisClient } = require("../config/redisClient.js");
const mongoose = require("mongoose");
const os = require("os");

const router = express.Router();

router.get("/health", (req, res) => {

  const memoryUsage = process.memoryUsage();

  const cpuUsage = process.cpuUsage();

  const healthStatus = {

    status: "OK",

    uptime: process.uptime(),

    timestamp: Date.now(),

    system: {
      platform: os.platform(),
      cpuCores: os.cpus().length,
      totalMemory: os.totalmem(),
      freeMemory: os.freemem(),
    },

    memory: {
      rss: memoryUsage.rss,
      heapTotal: memoryUsage.heapTotal,
      heapUsed: memoryUsage.heapUsed,
    },

    cpu: cpuUsage,

    redis: redisClient.isOpen ? "Connected" : "Disconnected",

    database:
      mongoose.connection.readyState === 1
        ? "Connected"
        : "Disconnected",
  };

  res.status(200).json(healthStatus);
});

module.exports = router;