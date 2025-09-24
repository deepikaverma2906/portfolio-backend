const Skill = require('../models/Skill');

// GET all skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST a new skill
exports.addSkill = async (req, res) => {
  const { title,category } = req.body;
  if (!title || !category) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newSkill = new Skill({ title, category });
    await newSkill.save();
    res.status(201).json({ message: "Skill added successfully", skill: newSkill });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
