const db = require("../modals/VideoGenerationModal.js");

exports.getVideoGenerationList = async (req, res) => {
  try {
    const VideoGenerationList = await db.find({}).sort({
      _id: -1,
    });
    try {
      res.status(200).json({
        status: 200,
        data: VideoGenerationList,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addVideoGeneration = async (req, res) => {
  try {
    const list = await db({
      text: req.body.text,
      url: req.body.url
    });
    await list.save();
    res.status(200).json({ data: "Data added successfully", status: 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
