const express = require('express');
const path = require("path");
const serverless = require('serverless-http');
const animal = require("../routes/animal");
const category = require("../routes/category");
const error = require("../middleware/error");

const app = express(); 
const router = express.Router();

app.use(express.static(path.join(__dirname, "uploads")));

router.get("/",(req, res)=>{
  res.send("app is running...")
});
app.use(express.json());
app.use("/animal", animal);
app.use("/category", category);
app.use(error);

// Mount router at the specified base path
app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
