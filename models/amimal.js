const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);
const {categorySchema} = require("../models/category")

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  categoryInfo:{
    type: categorySchema,
    required: true,
  },
  image: { type: String, required: true } 
});

function validateAnimal(Animal) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    image: Joi.any().allow(null),
    categoryId:Joi.objectId().required(),
  });

  return schema.validate(Animal);
}

const Animal = mongoose.model("Animal", animalSchema);

exports.animalSchema = animalSchema;
exports.Animal = Animal;
exports.validateAnimal = validateAnimal;
