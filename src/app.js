require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const app = express();
const { errorHandler } = require("./middlewares/errorHandler.middleware");
const morganMiddleware = require("./loggers/morgan.logger");
const { apiRateLimiter } = require("./utils/apiRateLimiter");
const cookieParser = require("cookie-parser");
const { BASE_URL } = require("./constant");
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(
    cors({
        origin: ["*", String(process.env.CLIENT_URL)], // Add Frontend url
        credentials: true,
    }),
);

/* Api Logger*/
app.use(morganMiddleware);

/*Api rate limiter*/
app.use(apiRateLimiter);

/* Routes imports */
const { userRoutes } = require("./routes/user.routes");
const { projectRoutes } = require("./routes/project.routes");

app.use(`${BASE_URL}/user`, userRoutes);
app.use(`${BASE_URL}/project`, projectRoutes);

// /*Error handler*/
app.use(errorHandler);

module.exports = { app };
