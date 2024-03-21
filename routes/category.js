const express = require("express");
const router = express.Router();
const { Category, validate } = require("../models/category");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({
   name:req.body.name
  });
  await category.save();

  res.send(category);
});

router.get("/", async (req, res) => {
  try {
    const category = await Category.find();
    res.send(category);
  } catch (ex) {
    res.status(500).send("internal server error");
  }
});

module.exports = router;
