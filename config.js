// config.js
require("dotenv").config();

module.exports = {
    PORT: process.env.PORT,
    mongoURI: process.env.mongoURI,
    imageUrl: process.env.imageUrl
};
