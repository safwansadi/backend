const express = require('express');
const path = require("path");
const serverless = require('serverless-http');

const app = express(); 

app.use(express.static(path.join(__dirname, "uploads")));

require("../startup/routes")(app);
require("../startup/db")();
require("../startup/db")();

const router = express.Router();

app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
