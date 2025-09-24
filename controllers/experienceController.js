const Experience = require('../models/Experience');

// ➕ Add Experience
exports.addExperience = async (req, res) => {
  try {
    const { title, company, description } = req.body;

    const newExp = new Experience({ title, company, description });
    const savedExp = await newExp.save();

    res.status(201).json({ message: 'Experience added successfully', experience: savedExp });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add experience', error: error.message });
  }
};

// 📋 Get All Experiences
exports.getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch experiences', error: error.message });
  }
};

// ✏️ Update Experience
exports.updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, company, description } = req.body;

    const updated = await Experience.findByIdAndUpdate(
      id,
      { title, company, description },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.status(200).json({ message: 'Experience updated', experience: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update', error: error.message });
  }
};

// 🗑️ Delete Experience
exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Experience.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    res.status(200).json({ message: 'Experience deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete', error: error.message });
  }
};
