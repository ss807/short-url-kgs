const { getUser } = require("../service/auth");

// middleware to restrict APIs to logged in users only
async function restrictToLoggedinUserOnly(req, res, next) {
  // get uid from cookie
  const userUid = req.cookies?.uid;

  if (!userUid) return res.redirect(process.env.BASE_URL);
  
  // check if the logged in user is a valid user on platform
  const user = getUser(userUid);
  if (!user) return res.redirect(process.env.BASE_URL);

  // attach user with request to enable its usage in scope of API
  req.user = user;

  next();
}

async function checkAuthAndGetUser(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuthAndGetUser
};