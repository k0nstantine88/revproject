const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
const apiRouter = require('./routes');
const cors = require("cors")

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.static(path.join(__dirname, './public')));

app.use('/api', apiRouter);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.get('*404.css', function (req, res) {
  res.sendFile(path.join(__dirname, './public', '404.css'));
});

app.get('*game.css', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/', 'game.css'));
});

app.get('*game.js', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/', 'game.js'));
});

app.get('*game.html', function (req, res) {
  res.sendFile(path.join(__dirname, '../frontend/', 'game.html'));
});

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './public', 'index.html'));
});

module.exports = app;
