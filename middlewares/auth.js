const { getUser } = require("../service/auth");

// middleware to restrict APIs to logged in users only
async function restrictToLoggedinUserOnly(req, res, next) {
  // get uid from cookie
  const userUid = req.cookies?.uid;

  if (!userUid) return res.json({"message": "Not logged in"});
  
  // check if the logged in user is a valid user on platform
  const user = getUser(userUid);
  if (!user) return res.json({"message": "User not found"});

  // attach user with request to enable its usage in scope of API
  req.user = user;

  next();
}

module.exports = {
  restrictToLoggedinUserOnly
};