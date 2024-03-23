// config.js
require("dotenv").config();

module.exports = {
    PORT: process.env.PORT,
    mongoURI: process.env.mongoURI,
    imageUrl: process.env.imageUrl,
    cloudinary_cloud_name: process.env.cloudinary_cloud_name,
    cloudinary_api_key: process.env.cloudinary_api_key,
    cloudinary_api_secret: process.env.cloudinary_api_secret
};
