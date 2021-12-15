const express = require('express');
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("./src/routes/userRoutes")
const bankRouter = require("./src/routes/bankRoutes")

// Start express app
const app = express();

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Implement CORS
app.use(cors());
// parse json
app.use(bodyParser.json());
// Set security HTTP headers
app.use(helmet());

// Routes
app.use("/api/v1/user", userRouter)
app.use("/api/v1/bank", bankRouter)

module.exports = app;