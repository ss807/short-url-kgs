const shortid = require("shortid");
const URL = require("../models/url");
const validURL = require('valid-url');

// generates a short url for a long url
async function handleGenerateNewShortURL(req, res) {

  if (!req.user) return res.redirect("/login");
  // takes the longurl from the body of request
  const body = req.body;
  let error = '';
  if (!body.url){
    error = 'URL is required'
  } else if(!validURL.isUri(body.url)) {
    error = 'Enter valid URL'
  }
  if(!error){
  //generate a shortid() using shortid library
  const shortID = shortid();
  // assign this shortid to longurl and store it in the database
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  }); 

  const allurls = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    id: shortID,
    shortURL: process.env.BASE_URL+ "/" + shortID,
    urls: allurls,
  });
  } else {
    const allurls = await URL.find({ createdBy: req.user._id });
    return res.render("home", {
      error: error,
      urls: allurls,
    });
  }
}

module.exports = {
  handleGenerateNewShortURL,
};