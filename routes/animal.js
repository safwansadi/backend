const express = require("express");
const path = require("path");
const multer = require("multer");
const { addAnimal, addAnimalCloudinary } = require("../controllers/animalController");
const router = express.Router();
const { Animal } = require("../models/amimal");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), "./public"));
    },
    filename: function(req, file, cb) {
        // Generate a unique ID for the file name
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });
  
  router.post("/", upload.single("image"), addAnimalCloudinary);
  
  router.get("/", async (req, res) => {
    let query = {};
    if (req.query.categoryId) {
        query = { 'categoryInfo._id': req.query.categoryId };
    }
    const animal = await Animal.find(query);
    res.send(animal);
  });
  
module.exports = router;