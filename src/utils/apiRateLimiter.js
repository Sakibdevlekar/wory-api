// require('dotenv').config()
const { rateLimit } = require("express-rate-limit");
const { sendResponse } = require("./helper.utils");
const { logger } = require("../loggers/winston.logger");

/**
 * API Rate Limiter Configuration.
 *
 * @constant {Object} apiRateLimiter
 * @description
 * This configuration object defines rate limiting settings for API requests.
 * It uses the `rateLimit` middleware to limit the number of requests from
 * each IP address within a specified time window.
 */

const apiRateLimiter = rateLimit({
    windowMs: process.env.RATE_LIMIT_TIME * 60 * 1000 || 15 * 60 * 1000, // default is 15 minutes
    max: process.env.MAX_REQUESTS || 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
    skipFailedRequests: true, // If any request not failed that will not count
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    keyGenerator: (req) =>
        `${req.protocol}://${req.hostname}${req.originalUrl}`,
    message: async (req, res) => {
        logger.info(
            `\n${req.protocol}://${req.hostname}${req.originalUrl} [${req.method}] -> API is Rate-limited`,
        );
        return sendResponse(
            res,
            429,
            null,
            "Too many requests, please try again later.!",
        );
    },
});

module.exports = {
    apiRateLimiter,
};
