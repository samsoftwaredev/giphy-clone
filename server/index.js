const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const request = require("request");
const myKey = process.env.GIPHY_KEY;
const appProduction = process.env.APP_PRODUCTION;
const app = express();
let port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: false }));

//this is the / path
if (appProduction) {
  app.use(express.static(path.join(__dirname, "../build")));
} else {
  app.use(express.static(path.join(__dirname, "../public")));
}

app.get("/trending", (req, res) => {
  const url = `https://api.giphy.com/v1/gifs/trending?api_key=${myKey}&limit=${
    req.query.limit
  }&offset=${req.query.offset}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      res.send("Unable to connect to location services!");
    } else {
      res.send(body);
    }
  });
});

app.get("/search", (req, res) => {
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${myKey}&q=${
    req.query.q
  }&limit=${req.query.limit}&offset=${req.query.offset}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      res.send("Unable to connect to location services!");
    } else {
      res.send(body);
    }
  });
});

app.listen(port, () =>
  console.log(
    `Express server is running on localhost:${port}, go to port 3000 to see app`
  )
);
