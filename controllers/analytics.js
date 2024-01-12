const shortid = require("shortid");
const URL = require("../models/url");

// retrieves the analytics of the short URL
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  // finds analytics record in DB
  const result = await URL.findOne({ shortId });
  if (!result) return res.status(400).json({ error: "Wrong url, short url not mapped to any url" });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

async function handleDeleteURL(req, res) {
  const shortId = req.params.shortId;
  try {
    await URL.deleteOne({shortId: shortId});
    return res.json({message: "Successfully deleted"})
  } catch (error) {
    return res.json({message: error})
  }
}

async function handleArchiveURL(req, res) {
  
  const shortIds = req.body?.urls;
  console.log(shortIds);
  try {
    await URL.updateMany({shortId: { $in: shortIds}}, { status: 'archive'});
    return res.json({message: "Successfully Archived"})
  } catch (error) {
    return res.json({message: error})
  }
}

module.exports = {
  handleGetAnalytics,
  handleDeleteURL,
  handleArchiveURL
};