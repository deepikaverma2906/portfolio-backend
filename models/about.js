// const mongoose = require('mongoose');

// const aboutSchema = new mongoose.Schema({
//   // name: { type: String, required: true },
//   role: { type: String, required: true },
//   description: { type: String },
//   image: { type: String },
//   resume: { type: String },
//   // email: { type: String },
//   // phone: { type: String }
// }, { timestamps: true });

// module.exports = mongoose.model('About', aboutSchema);


const mongoose = require('mongoose');

const HighlightSchema = new mongoose.Schema({
  title: { type: String, required: true },
  value: { type: String, required: true }
});

const aboutSchema = new mongoose.Schema({
  bio: { type: String, required: true },
  highlights: [HighlightSchema],
  image: { type: String, required: true },  // stored as URL or filename
  resume: { type: String, required: true }         // stored as URL or filename
});

module.exports = mongoose.model('About', aboutSchema);
