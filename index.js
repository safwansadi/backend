const express = require('express');
const path = require("path");
const {PORT} = require('./config');
const serverless = require('serverless-http');

const app = express();

app.use(express.static(path.join(__dirname, "uploads")));

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();

module.exports.handler = serverless(app);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
