const mongoose = require("mongoose");

const VideoGenerationSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  url: {
    type: String,
  },
});

const db = mongoose.model("video-generation", VideoGenerationSchema);
module.exports = db;
