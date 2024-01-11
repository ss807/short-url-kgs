const express = require("express");
const {
  handleGetAnalytics,
} = require("../controllers/analytics");

const {
  handleGenerateNewShortURL,
} = require("../controllers/new_url");

const router = express.Router();

// route to generate new short url
router.post("/", handleGenerateNewShortURL);

router.get("/", (req, res) => {
  return res.redirect(process.env.BASE_URL);
});
// route to get the analytics of a url
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;