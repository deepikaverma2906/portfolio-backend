const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  name: String,
  headline: String,
  bio: String,
  imageUrl: String,
  github: String,
  linkedin: String,
  email: String,
  resume: String,
});

module.exports = mongoose.model('Home', homeSchema);
