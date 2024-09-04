const { getVideoGenerationList, addVideoGenerationList } = require("../controllers/VideoGeneration");

const router = require("express").Router();

router.get("/videoGenerations", getVideoGenerationList);
router.post("/videoGeneration", addVideoGenerationList);

module.exports = router;
