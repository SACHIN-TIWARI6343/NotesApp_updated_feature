const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const { connectRedis } = require('./config/redisClient'); // Import the Redis connection function
connectRedis(); // Connect to Redis

const app = require('./app'); // Import the Express app
const connectDB = require('./config/db'); // Import the database connection function
const logger = require('./utils/logger.js');

const { emailWorker } = require('./workers/emailWorker'); // Import the email worker

const PORT = process.env.PORT || 3000; // Get the port from environment variables or use default


// Connect to the database before starting the server
const startServer = async ()=>{
    await connectDB(); // Connect to the database
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
    });
} 

startServer(); // Call the function to start the server and connect to the database