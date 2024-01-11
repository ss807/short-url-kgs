const express = require("express");
const { handleUserSignup, handleUserLogin, handleUserLogout  } = require("../controllers/user");

const router = express.Router();

// routes to handle login and signup
router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);
router.post("/logout", handleUserLogout);

router.get("/", (req, res) => {
    return res.redirect(process.env.BASE_URL);
  });

module.exports = router;