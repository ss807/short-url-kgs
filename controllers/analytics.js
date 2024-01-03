const shortid = require("shortid");
const URL = require("../models/url");

// retrieves the analytics of the short URL
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  // finds analytics record in DB
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGetAnalytics,
};