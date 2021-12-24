require("dotenv").config();
var express = require("express");
var app = express();
var serverless = require("serverless-http");
var mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var tasksRouter = require("./routes/tasks");
var authRouter = require("./routes/auth");

mongoose.connect(process.env.dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

var globalRouter = express.Router();

globalRouter.use("/", indexRouter);
globalRouter.use("/tasks", tasksRouter);
globalRouter.use("/auth", authRouter);

app.use("/.netlify/functions/app", globalRouter);

module.exports.handler = serverless(app);
