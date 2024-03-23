const { Animal, validateAnimal } = require("../models/amimal");
const { Category } = require("../models/category")
const cloudinary = require("../utils/cloudinary");
const { imageUrl } = require("../config");

exports.addAnimal = async (req, res) => {
  const { error } = validateAnimal(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, categoryId } = req.body;

  const category = await Category.findById(categoryId);
  if (!category) return res.status(400).send("Invalid category id.");

  let image;

  if (req.file) {
    image =  `${imageUrl}/${req.file.filename}` 
  };

  const animal = new Animal({
    name,
    categoryInfo: {
        _id: category._id,
        name: category.name,
      },
    image
  });

  try {
    const savedAnimal = await animal.save();
    res.status(201).json({ animal: savedAnimal });
    } catch (error) {
    res.status(400).json({ error: error.message });
    }
};

exports.addAnimalCloudinary = async (req, res) => {
  const { error } = validateAnimal(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { name, categoryId } = req.body;

  const category = await Category.findById(categoryId);
  if (!category) return res.status(400).send("Invalid category id.");

  let imageUrl;

  cloudinary.uploader.upload(req.file.path, async function (err, result) {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Error"
      });
    }

    // Retrieve the image URL from the Cloudinary response
    imageUrl = result.secure_url;

    const animal = new Animal({
      name,
      categoryInfo: {
        _id: category._id,
        name: category.name,
      },
      imageUrl  // Store the image URL in the 'imageUrl' field of the Animal document
    });

    try {
      const savedAnimal = await animal.save();
      res.status(201).json({ animal: savedAnimal });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
};

