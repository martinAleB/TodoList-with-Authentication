const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");
const { validToken } = require("../utils/tokens");

const router = express.Router();

// POST
router.post("/getAll", async (req, res, next) => {
  const { authToken } = req.body;

  var id_user = validToken(authToken);
  if (!id_user) {
    return res.status(401).json({ status: "Unauthorized" });
  }

  id_user = mongoose.Types.ObjectId(id_user);
  const tasks = await Task.find({ id_user });

  res.status(200).json({
    status: "OK",
    tasks: tasks,
  });
});

router.post("/add", async (req, res, next) => {
  const { task, authToken } = req.body;

  var id_user = validToken(authToken);
  if (!id_user) {
    return res.status(401).json({ status: "Unauthorized" });
  }
  task.id_user = mongoose.Types.ObjectId(id_user);

  const TaskToAdd = new Task(task);
  await TaskToAdd.save((err, room) => {
    res.status(200).json({
      status: "OK",
      task: room,
    });
  });
});

// DELETE
router.delete("/delete", async (req, res, next) => {
  const { id, authToken } = req.body;

  var id_user = validToken(authToken);
  if (!id_user) {
    return res.status(401).json({ status: "Unauthorized" });
  }

  const findParams = {
    _id: mongoose.Types.ObjectId(id),
    id_user: mongoose.Types.ObjectId(id_user),
  };
  await Task.deleteOne(findParams);

  res.status(200).json({ status: "OK" });
});

module.exports = router;
