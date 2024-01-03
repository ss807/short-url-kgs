const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./connect");
const { restrictToLoggedinUserOnly } = require("./middlewares/auth");
const URL = require("./models/url");

const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

connectToMongoDB(process.env.MONGODB ?? "mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb Server connected")
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

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
  console.log(entry.redirectURL);
  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));