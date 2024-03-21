const {mongoURI} = require("../config");
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
  };
  