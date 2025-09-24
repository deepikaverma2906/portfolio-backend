// const mongoose = require('mongoose');

// const resumeSchema = new mongoose.Schema({
//   filename: { type: String, required: true },
//   path: { type: String, required: true },
//   uploadedAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Resume', resumeSchema);

const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resume', resumeSchema);
