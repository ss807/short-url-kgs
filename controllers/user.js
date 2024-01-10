const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../service/auth");

// callback function for signup api
async function handleUserSignup(req, res){
  let error = ''
  if(!req.body.name){
    error = error + 'Name, '
  }
  if(!req.body.email){
    error = error + 'Email, '
  }
  if(!req.body.password){
    error = error + 'Password, '
  }
  if(error){
    error = error.slice(0, -2)  + ' is required'
    return res.render("signup", { invalid : error});
  }
  else{
    // name, email and password from request body
    const { name, email, password } = req.body;

    const user = await User.findOne({ email });

    if(user) 
      return res.render("signup", { message : 'Email already exist'});
    // adding the  user in the user database
    await User.create({
      name,
      email,
      password,
    });
    return res.render("login", { message : 'Successfully Signed Up, Login to continue'});
  }
}

// callback function for login api
async function handleUserLogin(req, res) {
  let error = ''
  if(!req.body.email){
    error = error + 'Email, '
  }
  if(!req.body.password){
    error = error + 'Password, '
  }
  if(error){
    error = error.slice(0, -2)  + ' is required'
    return res.render("login", { invalid : error});
  }
  else{
      // getting email and password from request body
      const { email, password } = req.body;

      // finding the user from db
      const user = await User.findOne({ email, password });

      if (!user)
        return res.render("login", { invalid : "Invalid Username or Password"});

      // generating a session id for this login
      const sessionId = uuidv4();

      // maping this user to this session id in sessionIdToUserMap 
      setUser(sessionId, user);

      // setting the cookie
      res.cookie("uid", sessionId);
      return res.redirect("/");
  }
}

async function handleUserLogout(req, res) {
  res.status(200).clearCookie('uid');
  return res.render("login", { message : "logged out Successfully...!"});
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
  handleUserLogout
};