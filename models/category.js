const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
});

function validateCategory(Category) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });

  return schema.validate(Category);
}

const Category = mongoose.model("Category", categorySchema);

exports.categorySchema = categorySchema;
exports.Category = Category;
exports.validate = validateCategory;
