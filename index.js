const express = require('express');
const path = require("path");
const {PORT} = require('./config');

const app = express();
app.use(express.static(path.join(__dirname, "public")));

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/validation")();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
