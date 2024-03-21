const { Animal, validate } = require("../models/amimal");
const { Category } = require("../models/category")
const { imageUrl } = require("../config");

exports.addAnimal = async (req, res) => {
  const { error } = validate(req.body);
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
