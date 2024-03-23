const express = require('express');
const router = express.Router();
const path = require("path");
const serverless = require('serverless-http');
const animal = require("../routes/animal");
const category = require("../routes/category");
const error = require("../middleware/error");
const multer = require("multer");
const { addAnimalCloudinary } = require("../controllers/animalController");
const { Animal } = require("../models/amimal");
const { Category, validate } = require("../models/category");

const {mongoURI} = require("../config");
const mongoose = require('mongoose');

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
    
const app = express(); 

app.use(express.json());

router.get("/",(req, res)=>{
  res.send("app is running...")
});

const storage = multer.diskStorage({
  filename: function(req, file, cb) {
      cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post("/animal", upload.single("image"), addAnimalCloudinary);

router.get("/animal", async (req, res) => {
  let query = {};
  if (req.query.categoryId) {
      query = { 'categoryInfo._id': req.query.categoryId };
  }
  const animal = await Animal.find(query);
  res.send(animal);
});

router.post("/category", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = new Category({
   name:req.body.name
  });
  await category.save();

  res.send(category);
});

router.get("/category", async (req, res) => {
  try {
    const category = await Category.find();
    res.send(category);
  } catch (ex) {
    res.status(500).send("internal server error");
  }
});

app.use("/animal", animal);
app.use("/category", category);
app.use(error);

// Mount router at the specified base path
app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
