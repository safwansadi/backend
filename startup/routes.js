const express = require("express");
const animal = require("../routes/animal");
const category = require("../routes/category");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/animal", animal);
  app.use("/api/category", category);
  app.use(error);
};
