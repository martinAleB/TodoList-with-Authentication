const mongoose = require("mongoose");
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    id_user: { type: mongoose.ObjectId, required: true },
  },
  { collection: "tasks" }
);

module.exports = mongoose.model("Task", TaskSchema);
