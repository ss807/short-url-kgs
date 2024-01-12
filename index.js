const dotenv = require('dotenv').config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const { restrictToLoggedinUserOnly, checkAuthAndGetUser } = require("./middlewares/auth");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/static");

const cors = require('cors');
const app = express();
const PORT = 8001;

connectToMongoDB(process.env.MONGODB).then(() =>
  console.log("Mongodb Server connected")
);

// load static assets
app.use('/static', express.static(path.join(__dirname, 'assets')))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", checkAuthAndGetUser, staticRoute);

// /url route is for shortening the url and getting analytics of the url
app.use("/url", restrictToLoggedinUserOnly, urlRoute);

// user route is for signup and login of a user
app.use("/user", userRoute);

// this /:shortId is to route the url to original long url
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  console.log(shortId)
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) return res.render("signup", { message : "This short url is not mapped to any url. Start creating your own urls and analyze them"}); 
  console.log(entry?.redirectURL);
  if(entry?.status === "archived"){
    return res.json({message: "This URL is archived"})
  } else{
    res.redirect(entry.redirectURL);
  }
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));