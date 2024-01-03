const shortid = require("shortid");
const URL = require("../models/url");

// generates a short url for a long url
async function handleGenerateNewShortURL(req, res) {
  // takes the longurl from the body of request
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  //generate a shortid() using shortid library
  const shortID = shortid();

  // assign this shortid to longurl and store it in the database
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });

  // return the shortid as the response 
  return res.json({ id: shortID  });
}

module.exports = {
  handleGenerateNewShortURL,
};