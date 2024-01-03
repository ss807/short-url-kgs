const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

// callback function for signup api
async function handleUserSignup(req, res) {

  // name, email and password from request body
  const { name, email, password } = req.body;

  // adding the  user in the user database
  await User.create({
    name,
    email,
    password,
  });

  return res.json({'message': 'Successfully Signed Up, Login to continue'})
}

// callback function for login api
async function handleUserLogin(req, res) {

  // getting email and password from request body
  const { email, password } = req.body;

  // finding the user from db
  const user = await User.findOne({ email, password });

  if (!user)
    return res.json({'message': 'Invalid Username or Password'})

  // generating a session id for this login
  const sessionId = uuidv4();

  // maping this user to this session id in sessionIdToUserMap 
  setUser(sessionId, user);

  // setting the cookie 
  res.cookie("uid", sessionId);
  return res.json({'message': 'Logged in successfully.'})
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};