const mongoose = require("mongoose");
const mongoDBdir = process.env.dbConnectionString;

mongoose.connect(mongoDBdir, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
