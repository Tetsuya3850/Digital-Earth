const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();

const DATA_FILE = path.join(__dirname, "data.json");

app.set("port", process.env.API_PORT || 3001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

app.get("/api/scenario", (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    res.setHeader("Cache-Control", "no-cache");
    res.json(JSON.parse(data));
  });
});

app.post("/api/scenario", (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const scenario = JSON.parse(data);
    const newScene = {
      id: req.body.id,
      lon: req.body.lon,
      lat: req.body.lat,
      global: req.body.global,
      title: req.body.title,
      text: req.body.text
    };
    scenario.push(newScene);
    fs.writeFile(DATA_FILE, JSON.stringify(scenario, null, 4), () => {
      res.setHeader("Cache-Control", "no-cache");
      res.json(scenario);
    });
  });
});

export default app;
