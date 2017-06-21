const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

const DATA_FILE = path.join(__dirname, 'data.json');

app.set('port', (process.env.API_PORT || 3001));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('/api/projects', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/projects', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    const projects = JSON.parse(data);
    const newProject = {
      id: req.body.id,
      title: req.body.title,
      titleForUrl: req.body.titleForUrl,
      catch: req.body.catch,
      logoImg: req.body.logoImg,
      mainImg: req.body.mainImg,
      text: req.body.text,
      url: req.body.url,
    };
    projects.push(newProject);
    fs.writeFile(DATA_FILE, JSON.stringify(projects, null, 4), () => {
      res.setHeader('Cache-Control', 'no-cache');
      res.json(projects);
    });
  });
});

export default app;
