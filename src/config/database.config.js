const mongoose = require('mongoose');
const {DB_NAME} = require('../constant');
const {apiError} = require('../utils/helper.utils');

/**
 * Connects to MongoDB database using Mongoose.
 *
 * @async
 * @function connectDB
 * @throws {apiError} Throws an error if the connection fails.
 * @returns {void}
 */
const connectDB = async () => {
    try {
        // Connect to MongoDB using Mongoose
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        // Log successful connection
        console.log(`MongoDB connected!! DB HOST:${connectionInstance.connection.host}`);
    } catch (error) {
        // Throw custom error if connection fails
        throw new apiError(500, `MongoDB connection failed ${error.message}`);
    }
}

module.exports = {
    connectDB
}