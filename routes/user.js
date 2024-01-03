const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controllers/user");

const router = express.Router();

// routes to handle login and signup
router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);

module.exports = router;