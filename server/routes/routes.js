const { getVideoGenerationList, addVideoGeneration } = require("../controllers/VideoGeneration");

const router = require("express").Router();

router.get("/videoGenerations", getVideoGenerationList);
router.post("/videoGeneration", addVideoGeneration);

module.exports = router;
