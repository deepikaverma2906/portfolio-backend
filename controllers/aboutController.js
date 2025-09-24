const About = require('../models/about');

exports.saveAbout = async (req, res) => {
  try {
    const data = req.body;

    // Parse highlights if it's a JSON string
    if (typeof data.highlights === 'string') {
      try {
        data.highlights = JSON.parse(data.highlights);
      } catch (e) {
        return res.status(400).json({ message: "Invalid highlights format", error: e.message });
      }
    }

    const { bio } = req.body;
data.bio = bio;


    if (req.files.image) {
      data.image = `/uploads/about/${req.files.image[0].filename}`;
    }
    if (req.files.resume) {
      data.resume = `/uploads/about/${req.files.resume[0].filename}`;
    }

    console.log('DATA TO BE SAVED ===>', data);


    let about = await About.findOne();
    if (about) {
      about = await About.findByIdAndUpdate(about._id, data, { new: true });
    } else {
      about = await About.create(data);
    }

    res.status(200).json({ message: 'About info saved', about });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save About info', error: error.message });
  }
};

exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch About info', error: error.message });
  }
};

// PUT (to update profileImage, resume, etc.)
exports.updateAbout = async (req, res) => {
  try {
    const updated = await About.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update about info' });
  }
};
