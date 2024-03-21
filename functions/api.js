const express = require('express');
const router = express.Router();
const path = require("path");
const serverless = require('serverless-http');
const animal = require("../routes/animal");
const category = require("../routes/category");
const error = require("../middleware/error");
const multer = require("multer");
const { addAnimal } = require("../controllers/animalController");
const { Animal } = require("../models/amimal");

const {mongoURI} = require("../config");
const mongoose = require('mongoose');

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
  


const app = express(); 

app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.json());

router.get("/",(req, res)=>{
  res.send("app is running...")
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "./uploads"));
  },
  filename: function(req, file, cb) {
      // Generate a unique ID for the file name
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post("/animal", upload.single("image"), addAnimal);

router.get("/animal", async (req, res) => {
  let query = {};
  if (req.query.categoryId) {
      query = { 'categoryInfo._id': req.query.categoryId };
  }
  const animal = await Animal.find(query);
  res.send(animal);
});

app.use("/animal", animal);
app.use("/category", category);
app.use(error);

// Mount router at the specified base path
app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
