const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const pino = require("express-pino-logger")();
const request = require("request");
const myKey = "QaTaTpn5xJGGG1Wktc0Gq6CEhsiSz2R3";
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
console.log(path.join(__dirname, "../build"));
app.use(express.static(path.join(__dirname, "../build")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

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

app.listen(process.env.PORT || 3001, () =>
  console.log("Express server is running on localhost:3001")
);
