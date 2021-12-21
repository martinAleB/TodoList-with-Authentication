require("dotenv").config();
var express = require("express");
var app = express();
var serverless = require("serverless-http");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var tasksRouter = require("./routes/tasks");
var authRouter = require("./routes/auth");

app.use(cors({ origin: true, credentials: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

mongoose.connect(process.env.dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var globalRouter = express.Router();

globalRouter.use("/", indexRouter);
globalRouter.use("/tasks", tasksRouter);
globalRouter.use("/auth", authRouter);

app.use("/.netlify/functions/app", globalRouter);

module.exports.handler = serverless(app);
